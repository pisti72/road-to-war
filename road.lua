require("levels")

function test()
  print("test from road")
end

function printMap(levelIndex)
  local level = levels[levelIndex]
  if not level then
    print("Level " .. levelIndex .. " not found.")
    return
  end
  print("Map: " .. level.name)
  for i = 1, #level.terrain do
    local row = level.terrain[i]
    print(row)
  end
end
