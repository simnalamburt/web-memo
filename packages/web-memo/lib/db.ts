// TODO: Use SQLite3
let lastId = 2
const memos = new Map([
  [
    1,
    'Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante.',
  ],
  [
    2,
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  ],
])

export function getMemos() {
  return [...memos.entries()]
}

export function createMemo(content: string) {
  lastId += 1
  memos.set(lastId, content)
  return lastId
}

export function updateMemo(id: number, content: string) {
  memos.set(id, content)
}

export function deleteMemo(id: number) {
  memos.delete(id)
}
