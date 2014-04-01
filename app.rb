require 'sinatra'
require 'sequel'

DB = Sequel.sqlite
DB.create_table :articles do
  primary_key :id
  String :content
end
articles = DB[:articles]

get '/' do
  erb :main
end

get '/articles/' do
  @data = articles.all
  erb :articles
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
