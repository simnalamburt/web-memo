require 'sinatra'

get '/' do
  send_file 'main.html'
end

post '/' do
  return :ok
end
