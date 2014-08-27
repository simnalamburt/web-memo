require 'sinatra'
require 'sinatra/json'
require 'sequel'



### Model
DB = Sequel.sqlite 'db/data.db'

Sequel::Model.plugin :schema
class Memo < Sequel::Model
  set_schema do
    primary_key :id
    String :content
  end
end

unless Memo.table_exists?
  Memo.create_table

  [<<-A, <<-B].each { |seed| Memo.create content: seed }
Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante.
  A
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  B
end



### Controller
get '/' do
  json DB[:memos].all
end

post '/memos/' do
  content = params[:content]

  # No empty memo
  if content.empty?
    return 400
  end

  Memo.create do |memo|
    memo.content = content
  end
  200
end

put '/memos/:id' do
  DB.transaction do
    memo = Memo[params[:id]]
    memo.lock!
    memo.content = params[:content]
    memo.save
  end
  200
end

delete '/memos/:id' do
  Memo[params[:id]].destroy
  200
end
