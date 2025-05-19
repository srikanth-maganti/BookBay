import React from "react"
import "../assets/Home.css"
function Home()
{
    return(
        <div className ="home-content">
            <div>
                <img src="/images/pic2.jpg" alt="?" className="home-img"/>
                <div className="arrows">
                    <div className="left"><i className="fa-solid fa-chevron-left"></i></div>
                    <div className="right"><i className="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>
            <div className="quote">
                <div className="quote-img">
                    <img src="/images/girl.jpg" alt=""/>
                </div>
                <div className="quote-content">
                    <blockquote className="quote-text">
                        "A reader lives a thousand lives before he dies. The man who never reads lives only one."
                        <footer className="quote-author">
                            - George R.R. Martin
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Home
    