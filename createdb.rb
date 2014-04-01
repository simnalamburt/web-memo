require 'sequel'

# cleanup
if File.exist?('data.db')
  File.delete('data.db')
end

# create db & table
DB = Sequel.sqlite('data.db')
DB.create_table :articles do
  primary_key :id
  String :content
end

# insert sample datas
articles = DB[:articles]
articles.insert content: "Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante."
articles.insert content: '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'
