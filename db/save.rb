require 'date'

source = 'data.db'
targetdir = 'backups'
target = "#{targetdir}/#{DateTime.now.strftime '%y%m%d_%H%M%S_%L'}"

puts "   #{source} => #{target}"
`mkdir -p #{targetdir}`
`bzip2 -kc #{source} > #{target}`

if $?.success?
  puts ' * 백업 완료'
else
  puts ' ! 백업 실패'
  puts " - bzip2 has returned '#{$?.exitstatus}'"
  exit 1
end
