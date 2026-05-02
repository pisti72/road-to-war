require("road")

function love.load()
  love.window.setTitle("Road To War" )
  x, y, w, h = 20, 20, 60, 20
  width = 800
  height = 480
  scale = 8
  flags = {fullscreen = false}
  success = love.window.setMode( width, height, flags )
  bunny = love.graphics.newImage("gfx/Sprite-0001.png")
  title_img = love.graphics.newQuad(4, 15, 54, 8, bunny)
  canvas = love.graphics.newCanvas(width / scale, height / scale)
  canvas:setFilter("nearest", "nearest")
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
    love.graphics.setCanvas(canvas)
    love.graphics.clear()
    --love.graphics.print("Hello World", 10, 10)
    love.graphics.draw(bunny, title_img, 0, 0)
    love.graphics.setCanvas()

    love.graphics.setBlendMode("alpha", "premultiplied")
    love.graphics.draw(canvas, 0, 0, 0, scale, scale)
    love.graphics.setBlendMode("alpha")
end
