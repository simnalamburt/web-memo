require 'sinatra'
require 'sequel'

DB = Sequel.sqlite('data.db')
articles = DB[:articles]

get '/' do
  erb :main
end

get '/articles/' do
  @data = articles.all
  erb :articles
end

post '/articles/' do
  articles.insert content: request.body.read
  return 200
end
