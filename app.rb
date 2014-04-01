require 'sinatra'
require 'sequel'
require 'json'

DB = Sequel.sqlite
DB.create_table :articles do
  primary_key :id
  String :content
end
articles = DB[:articles]

get '/' do
  send_file 'main.html'
end

get '/articles/' do
  content_type :json
  articles.all.to_json
end

post '/articles/' do
  content = request.body.read
  if !content.empty?
    articles.insert content: content
    return 200
  else
    return 400
  end
end
