defmodule LiveCampaignSentiment.UpdateStats do
  use Timex

  def process(%{name: name, value: value, timestamp: timestamp, place: place}, state) do
    new_count   = state[name][:count] + 1
    new_total   = state[name][:total] + value
    new_average = (new_total / new_count) |> Float.round(4)

    two_minutes_ago = Timex.now |> Timex.shift(minutes: -2)
    new_rolling_data = ([%{value: value, timestamp: timestamp} | Enum.filter(state[name][:rolling][:tweets], fn(tweet) -> tweet_is_within_two_minutes?(two_minutes_ago, tweet) end)])
    |> calculate_rolling_data

    new_location_data = case place do
      nil -> state[name][:location]
      _   -> state[name][:location] |> update_location_data(%{value: value, timestamp: timestamp, place: place}, two_minutes_ago)
    end

    {new_positive, new_negative, new_positive_percent, new_negative_percent} = process_value(value, state[name], new_count)

    %{state | name => %{rolling: new_rolling_data, location: new_location_data, count: new_count, average: new_average, total: new_total, positive: new_positive, negative: new_negative, positive_percent: new_positive_percent, negative_percent: new_negative_percent}}
  end

  defp update_location_data(location_data, tweet = %{value: value, timestamp: timestamp, place: place}, two_minutes_ago) do
    case parse_state_name(place) do
      {:ok, state_name} ->
        tweets = location_data[state_name][:tweets] || []
        new_state_data = ([%{value: value, timestamp: timestamp, state_name: state_name} | Enum.filter(tweets, fn(tweet) -> tweet_is_within_two_minutes?(two_minutes_ago, tweet) end)])
        |> calculate_rolling_data

        Map.merge(location_data, %{state_name => new_state_data})
      :error ->
        location_data
    end
  end

  defp parse_state_name(place = %{full_name: full_name, country_code: "US", place_type: "city"}) do
    [_, state] = String.split(full_name, ", ")

    {:ok, state}
  end
  defp parse_state_name(place = %{full_name: full_name, country_code: "US", place_type: "admin"}) do
    [state, _] = String.split(full_name, ", ")

    state |> get_state_abbreviation
  end
  defp parse_state_name(_), do: :error

  defp get_state_abbreviation(state_name) do
    state_mappings = %{
      "Alabama" => "AL", "Alaska" => "AK", "Arizona" => "AZ", "Arkansas" => "AR",
      "California" => "CA", "Colorado" => "CO", "Connecticut" => "CT", "Delaware" => "DE",
      "Florida" => "FL", "Georgia" => "GA", "Hawaii" => "HI", "Idaho" => "ID",
      "Illinois" => "IL", "Indiana" => "IN", "Iowa" => "IA", "Kansas" => "KS",
      "Kentucky" => "KY", "Louisiana" => "LA", "Maine" => "ME", "Maryland" => "MD",
      "Massachusetts" => "MA", "Michigan" => "MI", "Minnesota" => "MN",
      "Mississippi" => "MS", "Missouri" => "MO", "Montana" => "MT", "Nebraska" => "NE",
      "Nevada" => "NV", "New Hampshire" => "NH", "New Jersey" => "NJ", "New Mexico" => "NM",
      "New York" => "NY", "North Carolina" => "NC", "North Dakota" => "ND", "Ohio" => "OH",
      "Oklahoma" => "OK", "Oregon" => "OR", "Pennsylvania" => "PA", "Rhode Island" => "RI",
      "South Carolina" => "SC", "South Dakota" => "SD", "Tennessee" => "TN", "Texas" => "TX",
      "Utah" => "UT", "Vermont" => "VT", "Virginia" => "VA", "Washington" => "WA",
      "West Virginia" => "WV", "Wisconsin" => "WI", "Wyoming" => "WY"
    }

    case state_mappings[state_name] do
      nil -> :error
      abbreviation -> {:ok, abbreviation}
    end
  end

  defp tweet_is_within_two_minutes?(two_minutes_ago, tweet) do
    case tweet[:timestamp] |> Timex.parse("%a %b %d %T %z %Y", :strftime) do
      {:ok, tweet_time} ->
        tweet_time
        |> Timex.Timezone.convert("Etc/UTC")
        |> Timex.compare(two_minutes_ago)
        |> convert_to_bool
      _ ->
        false
    end
  end

  defp convert_to_bool(val) when val in [0, 1], do: true
  defp convert_to_bool(_), do: false

  defp calculate_rolling_data(tweets) do
    count   = Enum.count(tweets)
    total   = Enum.reduce(tweets, 0, fn(tweet, acc) -> tweet[:value] + acc end)
    average = (total / count) |> Float.round(4)
    positive_count = Enum.filter(tweets, fn(tweet) -> tweet[:value] > 0 end) |> Enum.count
    negative_count = Enum.filter(tweets, fn(tweet) -> tweet[:value] < 0 end) |> Enum.count
    positive_percent = ((positive_count / count) * 100) |> Float.round(4)
    negative_percent = ((negative_count / count) * 100) |> Float.round(4)

    %{tweets: tweets, count: count, total: total, average: average, positive: positive_count, positive_percent: positive_percent, negative: negative_count, negative_percent: negative_percent}
  end

  defp process_value(value, state, count) do
    cond do
      value == 0 ->
        {state[:positive], state[:negative], get_percent(state[:positive], count), get_percent(state[:negative], count)}
      value < 0 ->
        {state[:positive], state[:negative] + 1, get_percent(state[:positive], count), get_percent(state[:negative] + 1, count)}
      value > 0 ->
        {state[:positive] + 1, state[:negative], get_percent(state[:positive] + 1, count), get_percent(state[:negative], count)}
    end
  end

  defp get_percent(numerator, denominator) when denominator > 0 do
    ((numerator / denominator) * 100) |> Float.round(2)
  end

  defp get_percent(_, _) do
    "Cannot calculate"
  end
end
