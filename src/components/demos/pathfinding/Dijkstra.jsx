import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useState } from "react"

const Dijkstra = () => {

    class Tile {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
        }
    }

    function sketch(p5) {
        let step = 25
        let x = 0
        let y = 0
        let n = 0
        let pixelWidth = n*step
        let grid = new Array()

        p5.updateWithProps = (props) => {
            if (props.n) {

                n = props.n
                
                pixelWidth = n * step

                for(let i = 0; i < n; i++){
                    let row = new Array()
                    for (let j=0; j < n; j++){
                        row.push(0)
                    }
                    grid.push(row)
                }
            }
            p5.setup()
        }

        p5.setup = () => {
            p5.createCanvas(n * step, n * step)
            p5.background(250)
            console.log("Setting up.", grid)
            for (let row in grid){
                for (let col in grid[row]){
                    p5.strokeWeight(3)
                    p5.square(row*step, col*step, 25)
                }
            }
        }

        p5.mouseDragged = () => {
            let loc_x = Math.floor(p5.mouseX / step)
            let loc_y = Math.floor(p5.mouseY / step)
            if(loc_x < 0 || loc_x >= n) return
            if(loc_y < 0 || loc_y >= n) return
            grid[loc_x][loc_y] = 1
            p5.fill(250,0,0)
            p5.square(loc_x*step, loc_y*step, 25)
        }

        p5.mousePressed = () => {
            let loc_x = Math.floor(p5.mouseX / step)
            let loc_y = Math.floor(p5.mouseY / step)
            if(loc_x < 0 || loc_x >= n) return
            if(loc_y < 0 || loc_y >= n) return
            grid[loc_x][loc_y] = 0
            p5.fill(250)
            p5.square(loc_x*step, loc_y*step, 25)
        }

        p5.draw = () => {
            // if (i < pixelWidth) {
            //     if (j < pixelWidth) {
            //         p5.square(i, j, step)
            //         j += step
            //         return
            //     }
            //     i += step;
            //     j = 0;
            //     p5.square(i, j, step)
            // }
        }
    }


    return (
        <>
            <h1>Dijkstra's animation ....</h1>
            <ReactP5Wrapper sketch={sketch} n={10} />
        </>
    )
}

export default Dijkstra