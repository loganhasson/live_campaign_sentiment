defmodule LiveCampaignSentiment.StoreAndPublishStats do
  def handle(state) do
    Task.async(fn -> handle_async(state) end)

    state
  end

  defp handle_async(state) do
    RedisHash.new("sentiment_stats") |> RedisHash.push(state)
  end
end
