require 'sinatra'
require 'sequel'



### Define Model
DB = Sequel.sqlite('data.db')

Sequel::Model.plugin(:schema)
class Article < Sequel::Model
  set_schema do
    primary_key :id
    String :content
  end
end

unless Article.table_exists?
  Article.create_table
  Article.create do |entity|
    entity.content = "Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante."
  end
  Article.create do |entity|
    entity.content = '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'
  end
end



### Routes
get '/' do
  erb :main
end

get '/articles/' do
  @data = Article.all
  erb :articles
end

post '/articles/' do
  entity = Article.new
  entity.content = request.body.read
  entity.save
  return 200
end

put '/articles/:id' do
  DB.transaction do
    entity = Article[params[:id]]
    entity.lock!
    entity.content = request.body.read
    entity.save
  end
  return 200
end
