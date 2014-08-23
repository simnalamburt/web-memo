require 'date'

name = 'data.db'
source = "../#{name}"
target = "#{name}_#{DateTime.now.strftime '%y%m%d_%H%M%S_%L'}.bz2"

puts "   #{name} -> backups/#{target}"
`bzip2 -kc #{source} > #{target}`

if $?.success?
  puts ' * 백업 완료'
else
  puts ' ! 백업 실패'
  puts " - bzip2 has returned '#{$?.exitstatus}'"
  exit 1
end
