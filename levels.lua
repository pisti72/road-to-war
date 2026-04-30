levels = {
    {
        name = "level1",
        description = "This is the first level.",
        difficulty = "easy",
        dialogue = {
            {
                character = "Guide",
                text = "Welcome to the first level!"
            },
            {
                character = "Guide",
                text = "Your objective is to reach the end of the road."
            }
        },
        terrain = {
            "----------------",
            "---__________---",
            "--oCrrrrAooooo--",
            "ooooooooooooooo-",
            "ooooooooooooooo-",
            "ooooooooooooooo-",
        },
        actors = {
            {
                name = "C",
                type = "player",
                health = 100,
                position = {x = 3, y = 3}
            },
            {
                name = "A",
                type = "enemy",
                health = 50,
                position = {x = 10, y = 3}
            }
        }
    }
}