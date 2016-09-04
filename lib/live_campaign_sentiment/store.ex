defmodule LiveCampaignSentiment.Store do
  use GenServer

  @valid_names [:trump, :clinton]

  def init(state), do: {:ok, state}

  def start_link(state \\ LiveCampaignSentiment.Stats.empty, opts \\ [name: :live_campaign_sentiment_store]) do
    GenServer.start_link(__MODULE__, state, opts)
  end

  def stats do
    GenServer.call(:live_campaign_sentiment_store, :stats)
  end

  def update(payload) do
    GenServer.cast(:live_campaign_sentiment_store, {:update, payload})
  end

  def handle_call(:stats, _from, state) do
    trump_avg = state[:trump][:average]
    trump_positive = state[:trump][:positive_percent]

    clinton_avg = state[:clinton][:average]
    clinton_positive = state[:clinton][:positive_percent]

    {:reply, "Trump: #{trump_avg} - #{trump_positive}, Clinton: #{clinton_avg} - #{clinton_positive}", state}
  end

  def handle_cast({:update, payload = %{name: name}}, state) when name in @valid_names do
    new_state = LiveCampaignSentiment.UpdateStats.process(payload, state)
    {:noreply, new_state}
  end

  def handle_cast({:update, _invalid_payload}, state) do
    {:noreply, state}
  end
end
