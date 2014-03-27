require 'sinatra'

get '/' do
  send_file 'main.html'
end
