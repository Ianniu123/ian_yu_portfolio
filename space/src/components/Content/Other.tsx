const Other = () => {
  return (
    <>
      <div className="panel-content">
        <div className="left-section">
          <h2 className="welcome-text">Welcome to my website!</h2>
            
          <p className="description">
            Close this panel and move around the planets or use the bottom arrows 
            to discover more about me and my world!
          </p>
            
          <p className="navigation-text">
            You can navigate like you would do on a map, every planet have 
            different informations.
          </p>
            
          <p className="enjoy-text">Enjoy your trip!</p>
        </div>
          
        <div className="right-section">
          <p className="experience-text">
            If you look for the full experience you can hop on the spaceship and 
            start the journey in the open world version of the website.
          </p>
            
          <p className="vr-text">
            For even a better experience this website is fully compatible with VR headsets.
          </p>

          <p className="disclaimer">*This option is not available on a mobile device</p>
        </div>
      </div>
        
      <div className="bottom-controls">
        <button className="open-map-btn" onClick={() => console.log("dont know")}>
          OPEN MAP
        </button>
      </div>
    </>
  )
}

export default Other