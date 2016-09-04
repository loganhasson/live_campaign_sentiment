defmodule LiveCampaignSentiment.StreamSupervisor do
  use Supervisor

  def start(_, _) do
    start_link
  end

  def start_link do
    Supervisor.start_link(__MODULE__, :ok)
  end

  def init(:ok) do
    children = [
      worker(LiveCampaignSentiment.Store, []),
      worker(Task, [fn -> LiveCampaignSentiment.TwitterStream.subscribe end])
    ]

    supervise(children, strategy: :one_for_one)
  end
end
