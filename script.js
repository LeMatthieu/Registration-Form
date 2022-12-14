

class Employer {
    constructor(age,fname,lastname,email,adress,phonenumber,contract,birthday,experience,avatar,pwd){
    this.Age= age;
    this.Fname= fname;
    this.LastName = lastname;
    this.Email = email;
    this.Adresse = adress;
    this.PhoneNumber = phonenumber;
    this.Contract = contract;
    this.Birthday = birthday;
    this.Experience = experience;
    this.avatar = avatar;
    this.Password = pwd;
    }
}
let compteuremployer = 0; //compteur pour le nombre d'employer qu'on rajoute
let compteur=0; // compteur pour verifier le nb de tr et ajouter un nouveau tr
let compteurtab=0; //compteur pour savoir dans quel td on se situe pour ajouter la valeur qui correpson
let fname;
let lastname;
let age;
let email;
let adress;
let phonenumber;
let contract;
let birthday;
let experience;
let avatar;
let pwd;
var employer= [];
var erreur=0;


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

function getAge(date) { 
    var diff = Date.now() - date.getTime();
    var age = new Date(diff); 
    return Math.abs(age.getUTCFullYear() - 1970);
}
let tabinput = document.getElementsByTagName("input");

function  verification () {
    erreur=0;
    
    birthday =document.getElementById("birthday").value;
    age =getAge(new Date(birthday));
    //console.log("mon age est de ")
    for (let u = 0; u < tabinput.length; u++) {
    switch (tabinput[u].type) {
        case "text":
            if(tabinput[u].value=="")
            {
                parraerror="Veuillez completer tout les champs"
                erreur++;
                styleerror(tabinput,u,parraerror);
                u=tabinput.length;
            }
            else if(tabinput[u].name=="lname" || tabinput[u].name=="fname"){
                if(tabinput[u].value.length>30 || tabinput[u].value.length<2){
                    parraerror="Votre nom ou prénom contient trop de caractere (30 max) ou pas assez(minimum 2)"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                }       
                else if(/[0-9]/.test(tabinput[u].value )) {
                    parraerror="Votre nom ou prénom contient un nombre"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                } 
            }
            else if(tabinput[u].name=="age"){
                if(isNaN(parseInt(tabinput[u].value))){
                    parraerror="Vous n'avez pas entré un age en chiffre"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                }
                else if(tabinput[u].value > 120 || tabinput[u].value<16){
                    parraerror="Vous etes trop jeune ou trop vieux, verifiez votre age";
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                }
                else if(tabinput[u].value != age){
                    parraerror="Votre age ne correspond pas à votre date de naissance"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                }

            }
            else if(tabinput[u].name=="pnumber"){
                 if(tabinput[u].value.length != 10){
                    parraerror="Numéro de téléphone incorrect"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                 }
                 else if (tabinput[u].value[0]!=0){
                    parraerror="Numéro de téléphone incorrect"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                 }
                 else 
                 {
                     for(g=0;g<employer.length;g++){
                         if(tabinput[u].value == employer[g].PhoneNumber){
                             parraerror="Le numéro de téléphone indiqué est deja utiliser"
                             erreur++;
                             styleerror(tabinput,u,parraerror);
                             u=tabinput.length;
                         }
                     }
                 }
                 
            }
            else if(tabinput[u].name=="experience"){
                if(!/[0-9]/.test(tabinput[u].value[0])){
                    parraerror="Veuillez entrez votre expérience sous le format (X ans; ex : 5 ans)";
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                }
            }
            else if(tabinput[u].name=="password"){
                //console.log("la valeur est" + tabinput[u].value)
                if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+]).{8,30}/.test(tabinput[u].value)){
                    parraerror="Mot de passe incorrect, minimum 1 chiffre, une lettre majuscule, une lettre minuscule et un caractere spécial"
                    erreur++;
                    styleerror(tabinput,u,parraerror);
                    u=tabinput.length;
                    
                }
                
            }
        break;
        case "email":
            if(tabinput[u].value=="")
            {
                parraerror="Veuillez completer tout les champs";
                erreur++;
                styleerror(tabinput,u,parraerror);
                u=tabinput.length;
             }
             else if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(tabinput[u].value)){ // regex pour verifier un email
                parraerror="Vous n'avez pas entrer une adresse email correct";
                erreur++;
                styleerror(tabinput,u,parraerror);
                u=tabinput.length;
            }
            else 
            {
                for(g=0;g<employer.length;g++){
                    if(tabinput[u].value == employer[g].Email){
                        parraerror="L'adresse email indiqué est deja utilisé"
                        erreur++;
                        styleerror(tabinput,u,parraerror);
                        u=tabinput.length;
                    }
                }
            }
        break;
        case "date": 
            if(age > 50 || age < 18){
                parraerror="L'age doit être compris entre 18 ans et 50 ans";
                erreur++;
                styleerror(tabinput,u,parraerror);
                u=tabinput.length;
            }
        break;
        default:
        break;
    }
    }
    console.log("erreur a la fin de la fonction vaut : " + erreur)
}



document.getElementById("reset").addEventListener("click", (e)=>{

    e.preventDefault();
    document.getElementById("fname").value="";
    document.getElementById("lname").value="";
    document.getElementById("age").value="";
    document.getElementById("email").value="";
    document.getElementById("adress").value="";
    document.getElementById("pnumber").value="";
    document.getElementById("contract").value="";
    document.getElementById("birthday").value="";
    document.getElementById("experience").value="";
    document.getElementById("password").value="";
    
})

document.getElementById("envoyer").addEventListener("click", (e) => {

    
    styleerrorclear(tabinput);
    console.log(erreur)
    e.preventDefault();
    verification();
    compteurtab=0;
    if(erreur==0){
    fname=document.getElementById("fname").value;
    lastname=document.getElementById("lname").value.toUpperCase();
    age =getAge(new Date(birthday));
    email =document.getElementById("email").value;
    pwd=document.getElementById("password").value;
    adress =document.getElementById("adress").value;
    phonenumber =document.getElementById("pnumber").value;
    contract =document.getElementById("contract").value;
    experience =document.getElementById("experience").value;
    let avataricon = document.createElement("img");
    avataricon.setAttribute("src", "https://avatars.dicebear.com/api/initials/"+ fname[0] + lastname[0] + ".svg")
    avatar=avataricon;
    
    //console.log(fname, lastname, age, email, adress, phonenumber, contract, birthday, experience, avatar)
    employer.push(new Employer(age,fname,lastname,email,adress,phonenumber,contract,birthday,experience,avatar,pwd));


    let rowtab= document.createElement("tr");
    document.getElementById("bodytab").appendChild(rowtab);
    
    let selecttr = document.querySelectorAll("tr")

    while(compteurtab<5){
        
        //console.log("je passe dans la boucle");
        let coltab = document.createElement("td");
        employer[0]
        selecttr[compteur+1].appendChild(coltab);
        switch(compteurtab){
            case 0 : 
            coltab.innerHTML= '<a href="#">' + employer[compteuremployer].LastName  + " "+ fname[0].toUpperCase()+ fname.slice(1) + '</a>';
            break;
            case 1 :
            coltab.textContent= employer[compteuremployer].Email
            break;
            case 2 :
            coltab.textContent= employer[compteuremployer].Adresse
            break;
            case 3 :
            coltab.textContent= employer[compteuremployer].PhoneNumber
            break;
            case 4 :
            coltab.appendChild(avatar)
            break;
            default:
            break;
                
        }
        
        compteurtab++;
    }
    
    compteur+=1;
    compteuremployer +=1; 
    var modal = document.getElementById("myModal");
    var openmodal = document.querySelectorAll("a");
    openmodal.forEach((item, index) => {
    item.addEventListener("click", (e)=>{
        e.preventDefault();
        // get the content of the modal 
        var modalcontent= document.getElementsByClassName("modal-content")
        modalcontent[0].innerHTML=" " // reset la fenetre pour qu'elle soit vide
        modal.style.display = "block";
       // affichage de chaque element quand on clique dessus
       modalcontent[0].innerHTML += `<span class="close">&times;</span>
       <h2 id="textmodal">Informations détaillées</h2>`
        for(x=0;x<11;x++){
            console.log(x)
            switch(x){
                case 0 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Nom : " + employer[index].LastName;
                    modalcontent[0].appendChild(pdetail);
                break; 
                case 1 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Prénom : " + employer[index].Fname;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 2 :
                    var pdetail1=document.createElement("p");
                    var pdetail = document.createElement("img");
                    pdetail.setAttribute("src", "https://avatars.dicebear.com/api/initials/"+ fname[0] + lastname[0] + ".svg");
                    pdetail1.setAttribute("class", "icondetailler");
                    pdetail1.appendChild(pdetail)
                    modalcontent[0].appendChild(pdetail1);            
                break;
                case 3 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Age : " + employer[index].Age;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 4 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Email : " + employer[index].Email;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 5 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Adresse : " + employer[index].Adresse;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 6 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Numéro de téléphone : " + employer[index].PhoneNumber;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 7 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Date de naissance : " + employer[index].Birthday;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 8 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Type de contrat : " + employer[index].Contract;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 9 :
                    var pdetail = document.createElement("p");
                    pdetail.textContent="Experience dans la boite : " + employer[index].Experience;
                    modalcontent[0].appendChild(pdetail);
                break;
                case 10 : 
                var pdetail = document.createElement("p");
                pdetail.textContent="Password :" + employer[index].Password;
                modalcontent[0].appendChild(pdetail);

            }
        }
            // When the user clicks on <span> (x), close the modal
    

        //modalcontent[0].innerHTML += document.querySelector("table").innerHTML
    })


    
});
}})

function styleerror(tabinput,u,errormessage){
    tabinput[u].classList.add("error")
    if(document.getElementById("errormessage")=== null){
    paraerror= '<div id="errormessage"> <p>' + errormessage + '</p></div>'
    document.getElementById("formp1").insertAdjacentHTML("afterend", paraerror);
    }
}
// console.log(employerun)

function styleerrorclear(tabinput){
for (let m = 0; m < tabinput.length; m++) { 
    tabinput[m].classList.remove("error");  
    if(erreur>0){
     document.getElementById("errormessage").remove();
     }
     erreur=0;
}
}

avataricon = document.getElementsByTagName("img");
var modal = document.getElementById("myModal");
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(e) {
        e.preventDefault
    if (e.target == modal) {
    avataricon[0].classList.remove("icondetailler")
      modal.style.display = "none";
    }
    if (e.target == span[0]) {
        avataricon[0].classList.remove("icondetailler")
          modal.style.display = "none";
        }
  }
