require 'sinatra'
require 'sequel'



### Model
DB = Sequel.sqlite('data.db')

Sequel::Model.plugin(:schema)
class Memo < Sequel::Model
  set_schema do
    primary_key :id
    String :content
  end
end

unless Memo.table_exists?
  Memo.create_table
  Memo.create do |entity|
    entity.content = "Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante."
  end
  Memo.create do |entity|
    entity.content = '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'
  end
end



### Controller
get '/' do
  erb :main
end

get '/memos/' do
  erb :memos, locals: { data: Memo.all }
end

post '/memos/' do
  Memo.create do |memo|
    memo.content = request.body.read
  end
  200
end

put '/memos/:id' do
  DB.transaction do
    memo = Memo[params[:id]]
    memo.lock!
    memo.content = request.body.read
    memo.save
  end
  200
end

delete '/memos/:id' do
  Memo[params[:id]].destroy
  200
end
