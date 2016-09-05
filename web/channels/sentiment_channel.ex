defmodule LiveCampaignSentiment.SentimentChannel do
  use Phoenix.Channel

  def join("sentiment:global", _params, socket) do
    {:ok, socket}
  end
end
