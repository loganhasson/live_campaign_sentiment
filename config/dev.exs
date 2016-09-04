use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :live_campaign_sentiment, LiveCampaignSentiment.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin"]]

# Watch static and templates for browser reloading.
config :live_campaign_sentiment, LiveCampaignSentiment.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :live_campaign_sentiment, LiveCampaignSentiment.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "live_campaign_sentiment_dev",
  hostname: "localhost",
  pool_size: 10

config :extwitter, :oauth, [
  consumer_key: "O59tA4rzOEizOx440AZvXM9me",
  consumer_secret: "00MxxA76nrco1MUFN0taWqbAjiMSz6LLjBZkJRn4FZBH7XK2el",
  access_token: "15052759-FlOanNi7nRram66HmLOnGvQNAUiKm4mnbdJsHD2nA",
  access_token_secret: "c88Eto7cuMCWWMx7o7XDOIhXYF4Ue80bPXMUvvjI5VnHH"
]

config :ex_sider, redis_adapter: LiveCampaignSentiment.RedixPool
