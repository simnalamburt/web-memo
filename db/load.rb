if ARGV.empty?
  print <<-MESSAGE
어느 백업을 복구시킬지 지정해주세요
ex) ruby load.rb backups/140403_120000_000
  MESSAGE
  exit 1
elsif ARGV.length > 1
  print <<-MESSAGE
복구시킬 백업을 한개만 지정해주세요
ex) ruby load.rb backups/140403_120000_000
  MESSAGE
  exit 1
end

source = ARGV[0]
target = 'data.db'

puts "   #{source} => #{target}"
`xz -dkc #{source} > #{target}`

if $?.success?
  puts ' * 복구 완료'
else
  puts ' ! 복구 실패'
  puts " - bzip2 has returned '#{$?.exitstatus}'"
  exit 1
end
