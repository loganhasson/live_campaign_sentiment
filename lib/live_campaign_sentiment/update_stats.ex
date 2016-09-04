defmodule LiveCampaignSentiment.UpdateStats do
  def process(%{name: name, value: value}, state) do
    new_count   = state[name][:count] + 1
    new_total   = state[name][:total] + value
    new_average = (new_total / new_count) |> Float.round(4)

    {new_positive, new_negative, new_positive_percent, new_negative_percent} = process_value(value, state[name], new_count)

    %{state | name => %{count: new_count, average: new_average, total: new_total, positive: new_positive, negative: new_negative, positive_percent: new_positive_percent, negative_percent: new_negative_percent}}
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
