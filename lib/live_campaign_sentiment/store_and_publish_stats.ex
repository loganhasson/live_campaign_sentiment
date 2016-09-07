defmodule LiveCampaignSentiment.StoreAndPublishStats do
  def handle(state) do
    Task.async(fn -> handle_async(state) end)

    state
  end

  defp handle_async(state) do
    store_to_db(state) |> publish
  end

  defp store_to_db(state) do
    RedisHash.new("sentiment_stats") |> RedisHash.push(state)

    state
  end

  defp publish(state = %{trump: %{count: trump_count}, clinton: %{count: clinton_count}}) when rem((trump_count + clinton_count), 10) == 0 do
    LiveCampaignSentiment.Endpoint.broadcast("sentiment:global", "global_sentiment_update", lite_state(state))

    :ok
  end

  defp publish(_) do
    :ok
  end

  defp lite_state(%{trump: trump = %{rolling: trump_rolling, location: trump_location}, clinton: clinton = %{rolling: clinton_rolling, location: clinton_location}}) do
    %{
      trump: %{
        trump | rolling: %{trump_rolling | tweets: %{}}, location: lite_location(trump_location)
      },
      clinton: %{
        clinton | rolling: %{clinton_rolling | tweets: %{}}, location: lite_location(clinton_location)
      }
    }
  end

  defp lite_location(location_data) do
    for {key, value} <- location_data do
      new_value = for {sub_key, sub_value} <- value, sub_key != :tweets do
        {sub_key, sub_value}
      end |> Enum.into(%{})

      {key, new_value}
    end |> Enum.into(%{})
  end
end
