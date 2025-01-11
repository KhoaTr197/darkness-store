const Logo = ({
  width = 48,
  height = 48,
  mode = "light",
  copyright = false
}) => {
  // style="enable-background:new 0 0 324.1 261.7;" 
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324.1 261.7">
      <path fill="#8F00FF" d="M183.9,183.9L183.9,183.9L68.2,68L68,67.8l-0.2-0.2L3.9,3.7L0.2,0L0,0.2v96.5l94.7,94.7H154
	C164.8,191.5,174.9,188.7,183.9,183.9L183.9,183.9z"/>
      <polygon fill="#8F00FF" points="120.6,261.5 0.8,261.5 0.8,141.6 " />
      <path d="M259.7,122.9" />
      <path d="M286,131.8" />
      {copyright && <path fill={mode === 'light' ? "#FFFFFF" : "#000000"} d="M324.1,19.2c0,2.8-0.5,5.3-1.6,7.7c-1,2.4-2.4,4.4-4.2,6.2c-1.8,1.8-3.8,3.1-6.2,4.2c-2.4,1-4.9,1.6-7.7,1.6
	c-2.9,0-5.4-0.5-7.8-1.4s-4.4-2.3-6.1-4.1c-1.7-1.7-3.1-3.7-4.1-6.1s-1.4-4.9-1.4-7.8c0-2.8,0.5-5.3,1.6-7.7c1-2.4,2.4-4.4,4.2-6.1
	c1.8-1.8,3.8-3.1,6.2-4.1s4.9-1.6,7.7-1.6c2.9,0,5.4,0.5,7.8,1.4c2.4,1,4.4,2.3,6.1,4.1s3,3.7,4.1,6.1
	C323.5,13.8,324.1,16.5,324.1,19.2z M319.5,19.5c0-2.4-0.4-4.6-1.1-6.5s-1.8-3.6-3.1-4.9c-1.3-1.4-2.9-2.4-4.8-3.1s-3.8-1.1-6-1.1
	c-2.3,0-4.3,0.4-6.2,1.2c-1.8,0.8-3.5,1.9-4.8,3.4c-1.3,1.4-2.4,3-3.1,4.9c-0.7,1.8-1.1,3.8-1.1,5.9c0,2.3,0.4,4.4,1.1,6.3
	s1.8,3.6,3.1,4.9c1.3,1.4,2.9,2.4,4.8,3.2c1.8,0.7,3.8,1.1,6,1.1c2.3,0,4.4-0.4,6.2-1.2c1.9-0.8,3.5-1.9,4.8-3.4
	c1.3-1.4,2.3-3,3-4.8C319.1,23.5,319.5,21.6,319.5,19.5z M313.6,28.7c0,0.1,0,0.2-0.1,0.4c0,0.1-0.1,0.2-0.4,0.2s-0.5,0.1-0.8,0.1
	c-0.4,0-0.8,0-1.4,0s-1.1,0-1.3,0c-0.4,0-0.6-0.1-0.8-0.1c-0.2-0.1-0.4-0.2-0.5-0.4c-0.1-0.1-0.2-0.4-0.2-0.6l-1.1-3.5
	c-0.4-1.2-0.8-2-1.4-2.5s-1.3-0.7-2.5-0.7h-1.3v6.9c0,0.4-0.1,0.6-0.5,0.7c-0.2,0.1-1,0.2-1.9,0.2c-1,0-1.7-0.1-2-0.2
	c-0.4-0.1-0.5-0.4-0.5-0.7v-18c0-0.7,0.2-1.3,0.6-1.7s1-0.6,1.7-0.6h5.7c1.3,0,2.5,0.1,3.5,0.4c1,0.2,1.9,0.6,2.6,1.1
	s1.2,1.1,1.7,1.9c0.4,0.7,0.6,1.7,0.6,2.6c0,1.6-0.5,2.9-1.3,3.7s-2,1.6-3.5,1.9c0.8,0.2,1.6,0.7,2.3,1.3s1.3,1.6,1.8,2.9l1.2,3.2
	C313.5,28,313.6,28.4,313.6,28.7z M307.5,14.8c0-0.4,0-0.7-0.1-1.1s-0.2-0.6-0.6-0.8c-0.2-0.2-0.6-0.5-1.1-0.6s-1.1-0.2-1.8-0.2
	h-2.3v5.6h2.2c1.4,0,2.4-0.2,2.9-0.8C307.1,16.3,307.5,15.6,307.5,14.8z"/>}
      <path fill={mode === 'light' ? "#FFFFFF" : "#000000"} d="M285.6,131.1c0,42.2-19.9,79.6-50.8,103.6c-17,13.1-37.2,22.2-59.3,25.8c-3.4,0.5-6.8,1-10.3,1.2l-60.6-60.5
	h59.2c8,0,15.7-1.6,22.7-4.6c0.1,0,0.2-0.1,0.2-0.1c2.3-1,4.7-2.2,6.8-3.5c0.1-0.1,0.2-0.1,0.2-0.1c18.7-10.9,31.3-32,31.3-56.2
	c0-20.1-8.8-38.1-22.6-49.9c-11.1-12-26.6-19.5-43.8-19.5h-71L44.3,24.8L19.7,0h134.5c36.8,0,70,15,93.8,39.3
	C271.3,62.9,285.6,95.3,285.6,131.1z"/>
    </svg>
  )
}

export default Logo