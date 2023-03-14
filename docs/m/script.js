// Array of movie information
const movies = [
	{
	  title: "타이타닉",
	  description: "제목, 타이타닉, 개봉, 1998-02-20, 장르, 멜로/로맨스, 관객, 1,971,780명, 평점, 9.71점",
	  image: "titanic.jpg"
	},
	{
	  title: "인셉션",
	  description: "제목, 인셉션, 개봉, 2010-07-21, 장르, 액션, 관객, 5,926,948명, 평점, 9.60점",
	  image: "inception.jpg"
	},
	{
	  title: "캐치미이프유캔",
	  description: "제목, 캐치미이프유캔, 개봉, 2003-01-24, 장르, 드라마, 관객, 1,807,612명, 평점, 9.22점",
	  image: "catchmeifyoucan.jpg"
	},
	{
	  title: "돈룩업",
	  description: "제목, 돈룩업, 개봉, 2021-12-08, 장르, 코미디, 관객, 72,980명, 평점, 8.23점",
	  image: "dontlookup.jpg"
	}
  ];
  
  function openModal(movieIndex) {
	// Get the modal and modal content elements
	const modal = document.getElementById("modal");
	const modalContent = document.getElementById("modal-content");
  
	// Create a container element to hold the image and description
	const container = document.createElement("div");
	container.style.display = "flex";
	container.style.flexDirection = "row";
	container.style.alignItems = "center"; 
  

	// Create an image element and set its source and alt attributes
	const image = document.createElement("img");
	image.src = movies[movieIndex - 1].image;
	image.alt = movies[movieIndex - 1].title;
	image.style.marginRight = "2em"
  
	// Create a container element for the description
	const description = document.createElement("div");
		
	description.style.flex = "1";
  
	// Split the description string into an array of tokens
	const tokens = movies[movieIndex - 1].description.split(", ");
  
	// Loop through the tokens and create a container element for each token pair
	for (let i = 0; i < tokens.length; i += 2) {
	  const tokenPairContainer = document.createElement("div");
	  tokenPairContainer.style.display = "flex";
	  tokenPairContainer.style.flexDirection = "row";
  
	  const leftToken = document.createElement("span");
	  leftToken.style.fontWeight = "bold";
	  //leftToken.style.width = "6em";
	  leftToken.style.textAlign = "right"; 
	  leftToken.textContent = tokens[i].replace(":", "");
  
	  const rightToken = document.createElement("span");
	  rightToken.style.marginLeft = "0.5em";
	  rightToken.textContent = tokens[i + 1];
  
	  tokenPairContainer.appendChild(leftToken);
	  tokenPairContainer.appendChild(rightToken);
  
	  description.appendChild(tokenPairContainer);
	}
  
	// Add the image and description elements to the container
	container.appendChild(image);
	container.appendChild(description);
  
	// Set the modal content to the container element
	modalContent.innerHTML = "";
	//  <h1>${movies[movieIndex - 1].title}</h1>
	//`;
	modalContent.appendChild(container);
  
	// Show the modal
	modal.style.display = "block";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
	const modal = document.getElementById("modal");
	if (event.target == modal) {
	  closeModal();
	}
  }

    // Function to close the modal
	function closeModal() {
		// Get the modal element
		const modal = document.getElementById("modal");
	  
		// Hide the modal
		modal.style.display = "none";
	  }
	  