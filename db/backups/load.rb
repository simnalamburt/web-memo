if ARGV.empty?
  print <<-MESSAGE
어느 백업을 복구시킬지 지정해주세요
ex) ruby load.rb data.db_140403_120000_000
  MESSAGE
  exit 1
elsif ARGV.length > 1
  print <<-MESSAGE
복구시킬 백업을 한개만 지정해주세요
ex) ruby load.rb data.db_140403_120000_000
  MESSAGE
  exit 1
end

name = 'data.db'
source = ARGV[0]
target = "../#{name}"

puts "   backups/#{source} -> #{name}"
`bzip2 -dkc #{source} > #{target}`

if $?.success?
  puts ' * 복구 완료'
else
  puts ' ! 복구 실패'
  puts " - bzip2 has returned '#{$?.exitstatus}'"
  exit 1
end
