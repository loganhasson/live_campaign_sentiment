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
    LiveCampaignSentiment.Endpoint.broadcast("sentiment:global", "global_sentiment_update", state)

    :ok
  end

  defp publish(state) do
    :ok
  end
end
