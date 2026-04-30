require("road")

function love.load()
  love.window.setTitle("Road To War" )
  x, y, w, h = 20, 20, 60, 20
  width = 800
  height = 480
  flags = {fullscreen = false}
  success = love.window.setMode( width, height, flags )
  test()
end

function pressed_at(x ,y)
  print("pressed at:"..x..","..y)
end

function released_at(x,y)
  print("released at:"..x..","..y)
end

function love.mousepressed( x, y, button, istouch, presses )
  pressed_at(x ,y)
end

function love.mousereleased( x, y, button, istouch, presses )
  released_at(x, y)
end

function love.touchpressed( id, x, y, dx, dy, pressure )
  pressed_at(x, y)
end

function love.touchreleased( id, x, y, dx, dy, pressure )
  released_at(x, y)
end

function love.keypressed(key, scancode, isrepeat)
   if key == "escape" then
      print("Bye!")
      love.event.quit()
   elseif key == "d" then
      printMap(1)
   elseif key == "f" then
      --success = love.graphics.toggleFullscreen( )
   end   
end

function love.keyreleased(key, scancode, isrepeat)
   
end

function love.update(dt)
end

function love.draw()
    love.graphics.print("Hello World", 400, 300)
end
