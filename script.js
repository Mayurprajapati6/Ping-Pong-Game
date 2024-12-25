document.addEventListener("DOMContentLoaded",() => {

    let ball = document.getElementById("ping-pong-ball"); //targetting the ball

    let table = document.getElementById("ping-pong-table");

    let paddle = document.getElementById("ping-pong-paddle"); // targetting the paddle

    // here the ballX and ballY will be helping us to set a starting point of ball w.r.t table
    let ballX = 50; // distance of the top of the ball w.r.t ping pong table
    let ballY = 50; // // distance of the left of the ball w.r.t ping pong table

    let dx = 2; // displacement factor in x-direction , 2 -> you will displace by 2 px in +x direction, -2 -> you will displace by 2 px in -x direction
    let dy = 2; // displacement factor in y-direction , 2 -> you will displace by 2 px in +y direction, -2 -> you will displace by 2 px in -y direction

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    setInterval(function exec() {  
        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        //if(ballX > 700-20 || ballX <= 0) dx *=-1; // width of table - width of ball (700 - 20)
        //if(ballY > 400-20 || ballY <= 0) dy *= -1; // height of table - height of ball(400-20) // this above for ball not move outside the table that's why we - height/width beacuse ball move 2 right side from the table means left distance one time ball touch right side of the table this time ball move outside the table becuase here if we put contion 700 then left side of the table to ball distance required that's why ball move outside but we need ball touch right side of the table and move left side (negative direction) to solve this just subtract table width to ball width (this concept is also for height means top)

        /**
         * ballX < paddle.offsetLeft + paddle.offsetWidth -> if left(with respect to table) of ball < right(wrt table) ofpaddle 
         * ballY > paddle.offsetTop -> if top(wrt table) of ball > top(wrt table) of paddle
         *  
         * ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight
         * ballY + ball.offsetHeight              -> bottom of the ball
         * paddle.offsetTop + paddle.offsetHeight -> bottom of the paddle
         * 
         */
        // collision of ball and paddle
        if(ballX < paddle.offsetLeft + paddle.offsetWidth &&
            ballY > paddle.offsetTop &&
            ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight
        ) {
            dx *= -1;
        }

        // offsetWidth / offsetHeight -> live width or height of the div 
        if(ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0)   dx *= -1; // changes x-direction
        if(ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1; // change y-direction

    },1);

    //paddle

    let paddleY = 0;
    let dPy = 5; // displacement for paddle in y-direction // speed of the paddle
    document.addEventListener("keydown" , (event) => {
        event.preventDefault(); // prevents the execution of the default event behaviour
        if(event.keyCode == 38 && paddleY > 0) {
            // up arrow
            paddleY += (-1)*dPy;
        }
        else if(event.keyCode == 40 && paddleY < table.offsetHeight - paddle.offsetHeight) {
            //down arrow
            paddleY += dPy;
        }
        paddle.style.top = `${paddleY}px`;
    });

    document.addEventListener("mousemove",(event) => {

        if(event.clientX > table.offsetLeft + (table.offsetWidth/2)) return; // in table right if you move this will not move left side paddle -> this will use when you have two paddle one left and other is right side by this if you move left paddle move cursor to left move by mouse and if you move right paddle then simply move cursor to right and do same thig as left side

        let mouseDistanceFromTop = event.clientY; // this is the distance of the mouse point from the top of the screen
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointcontrol = mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight/2;

        paddleY = mousePointcontrol;
        if(paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight) return; // if bottom of the paddle touches bottom of the table then return

        paddle.style.top = `${mousePointcontrol}px`;
    })


});