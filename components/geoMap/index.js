import React, { useState, useEffect, useRef,useCallback  } from "react";
// import { setState } from "@/redux/slice/globaleState";
// import { useDispatch } from "react-redux";

const GeospatialWrapper = React.forwardRef((props, ref) => {
    const Geospatial = useRef(null)
    const [rendered, setRendered] = useState(false) 
  
    useEffect(() => {
      import("hexalytics-ui-components").then(mod => {
        Geospatial.current = mod.Geospatial
        setRendered(true)
      })
    
    }, [])
  
    if (!rendered) {
      return null
    }
    return <Geospatial.current ref={ref} {...props} />
  })

  GeospatialWrapper.displayName = "GeospatialWrapper";


const Index = (props) => {
  // const dispatch = useDispatch();
    const {onClick = () => {},mapProps} = props
    const geospatialRef = useRef(null); 
    
    // const onFeatureClick = useCallback((data) => {       
    //     onClick(data);     

    //   }, []);

    // const handleThemeClick = useCallback((theme) => {
    //     geospatialRef.current.changeCurrentTheme(theme);
    //   }, [geospatialRef.current]);

      useEffect(()=>{
        // dispatch( setState({handleThemeClick:handleThemeClick}))
      },[])
     
    
  return (
    <>   
    <GeospatialWrapper ref={geospatialRef}
    // onFeatureClick={onFeatureClick}
    { ...mapProps }/>   
  
  </>
  )
}

export default Index