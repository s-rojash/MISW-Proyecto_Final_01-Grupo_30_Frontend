function showDiv(divvar,x,y) 
	{
		//alert(divvar);  
		if (document.getElementById(divvar))
			{
			//alert(divvar);
			divref = document.getElementById(divvar).style;
                        /*divref.top = 30;
                        divref.left = 5;*/
			divref.visibility = 'visible';
			}
	}
function hideDiv(divvar)
{
		if (document.getElementById(divvar))
			{
			divref = document.getElementById(divvar).style;
			divref.visibility = 'hidden';
			}
}