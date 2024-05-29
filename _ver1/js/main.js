
//global variable
let gblSliceTbl = $("#sliceContainer");
let gblObjData = [];
let outContriesLinks = "";
let gblNoDeepLinks = "";
let linksChecker = [];
let tierLinks = {};
let gblObjTable = {
    column: 0,
    sliceID: "",
    alias: "",
    coreLink: "",
    imgSrc: "",
    imgAlt: "",
    goldTier: "",
    silverTier: "",
    bronzeTier: "",
    memberTier: ""
};

//page load
$( ".sortable" ).sortable({
    revert: true
  });

//functions
function addSliceForm(col,extra){

    let formTemplate = ''
    let extraData = (extra) ? " extra" : "";

    if(col == 2){
        // 2 columns table
        let genCode = generateCode();
        let inputsLeft = "";
        let inputsRight = "";

        if(!extraData){
            inputsLeft = `
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control goldTier" placeholder="Gold Deeplink" />
                <label>Gold Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control silverTier" placeholder="Silver Deeplink" />
                <label>Silver Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control bronzeTier" placeholder="Bronze Deeplink" />
                <label>Bronze Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control memberTier" placeholder="Member Deeplink" />
                <label>Member Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                        <input class="form-check-input noTier" type="checkbox" value="" id="${genCode}-check-left">
                        <label class="form-check-label" for="${genCode}-check-left">
                        No Deep Links
                        </label>
                        </div>
                    </div>
                </div>
            </div>             
            `

            inputsRight = `
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control goldTier" placeholder="Gold Deeplink" />
                <label>Gold Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control silverTier" placeholder="Silver Deeplink" />
                <label>Silver Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control bronzeTier" placeholder="Bronze Deeplink" />
                <label>Bronze Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" class="form-control memberTier" placeholder="Member Deeplink" />
                <label>Member Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                        <input class="form-check-input noTier" type="checkbox" value="" id="${genCode}-check-right">
                        <label class="form-check-label" for="${genCode}-check-right">
                        No Deep Links
                        </label>
                        </div>
                    </div>
                </div>
            </div>            
            `
        }

        formTemplate = `
        <div class="container sliceForm${extraData}" data-column="2">
            <div class="row">
                <div class="col-6 text-start mb-2">
                    <a data-bs-toggle="collapse" href="#${genCode}" role="button" aria-expanded="false" aria-controls="${genCode}" class="caretAnchor">
                    <i style="font-size:24px" class="fa pointer scColor caret" title="See Details">&#xf085;</i>
                    <span class="nameSlice" id="left-output-${genCode}">[Slice]</span>
                    </a>
                </div>
                <div class="col-6 mb-2">
                    <div class="row">
                        <div class="col text-start"><span class="nameSlice" id="right-output-${genCode}">[Slice]</span></div>
                        <div class="col text-end"><i style="font-size:24px" class="fa pointer btnClose">&#xf00d;</i></div>
                    </div>
                </div>
            </div>        
            <div class="row collapse" id="${genCode}">
            <div class="col-6">
                <div class="leftTable">
                <div class="row">
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control widthLeft widthCol" placeholder="Width" value="50" />
                        <label>Width - Left (Do not include '%', must have value always)</label>
                        </div>
                    </div>
                    </div>                
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" data-column="left" data-output="${genCode}" class="form-control sliceID" placeholder="Slice ID" />
                        <label>Slice ID - Left (must have unique value)</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control coreLink" placeholder="Core Link" />
                        <label>Core Link - Left (Please include the necessary "?" and "&")</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control imgSrc" placeholder="Image Source" />
                        <label>Image Source - Left</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control imgAlt" placeholder="Image Alt" />
                        <label>Image Alt - Left</label>
                        </div>
                    </div>
                    </div>
                    ${inputsLeft}                   
                </div>
                </div>
            </div>
            <div class="col-6">
                <div class="rightTable">
                <div class="row">
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control widthRight widthCol" placeholder="Width" value="50" />
                        <label>Width - Right (Do not include '%', must have value always)</label>
                        </div>
                    </div>
                    </div>                  
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" data-column="right" data-output="${genCode}" class="form-control sliceID" placeholder="Slice ID" />
                        <label>Slice ID - Right (must have unique value)</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control coreLink" placeholder="Core Link" />
                        <label>Core Link - Right (Please include the necessary "?" and "&")</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control imgSrc" placeholder="Image Source" />
                        <label>Image Source - Right</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" class="form-control imgAlt" placeholder="Image Alt" />
                        <label>Image Alt - Right</label>
                        </div>
                    </div>
                    </div>
                    ${inputsRight}                     
                </div>
                </div>
            </div>                  
            </div>
        </div>        
        `
    }else{
        // 1 column table
        let genCode = generateCode();
        let inputs = "";
        
        //if not extra data. add this inputs
        if(!extraData){
            inputs = `
            <div class="col-6">
            <div class="input-group mb-2">
            <div class="form-floating">
                <input type="text" class="form-control goldTier" placeholder="Gold Deeplink">
                <label>Gold Deeplink</label>
            </div>
            </div>
            </div>  
            <div class="col-6">
                <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" class="form-control silverTier" placeholder="Silver Deeplink">
                    <label>Silver Deeplink</label>
                </div>
                </div>
            </div>    
            <div class="col-6">
                <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" class="form-control bronzeTier" placeholder="Bronze Deeplink">
                    <label>Bronze Deeplink</label>
                </div>
                </div>
            </div>  
            <div class="col-6">
                <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" class="form-control memberTier" placeholder="Member Deeplink">
                    <label>Member Deeplink</label>
                </div>
                </div>
            </div> 
            <div class="col-6">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                            <input class="form-check-input noTier" type="checkbox" value="" id="${genCode}-check">
                            <label class="form-check-label" for="${genCode}-check">
                            No Deep Links
                            </label>
                        </div>
                    </div>
                </div>
            </div>                              
            `
        }

        formTemplate = `
        <div class="container sliceForm${extraData}" data-column="1">
            <div class="row">
                <div class="col-6 text-start mb-2">
                    <a data-bs-toggle="collapse" href="#${genCode}" role="button" aria-expanded="false" aria-controls="${genCode}" class="caretAnchor">
                        <i style="font-size:24px" class="fa pointer scColor caret" title="See Details">&#xf085;</i>
                        <span class="nameSlice" id="output-${genCode}">[Slice]</span>
                    </a>
                </div>
                <div class="col-6 text-end mb-2">
                    <i style="font-size:24px" class="fa pointer btnClose">&#xf00d;</i>
                </div>
            </div>
            <div class="row collapse" id="${genCode}">
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" data-output="${genCode}" class="form-control sliceID" placeholder="Slice ID (must have unique value)">
                        <label>Slice ID (must have unique value)</label>
                    </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control coreLink" placeholder="Core Link">
                        <label>Core Link (Please include the necessary "?" and "&")</label>
                    </div>
                    </div>
                </div>        
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control imgSrc" placeholder="Image Source">
                        <label>Image Source</label>
                    </div>
                    </div>
                </div>              
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control imgAlt" placeholder="Image Alt">
                        <label>Image Alt</label>
                    </div>
                    </div>
                </div>       
                
                ${inputs}

            </div>
        </div>    
        `    
    }


    return formTemplate;
}

function emailCode(objData){

    let htmlCode = '';

    if(objData.column == 2){
        // 2 Columns
        htmlCode = `
    <!-- Slice ${objData.sliceID[0]} ${objData.sliceID[1]} -->      
    <table class="full-width" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td valign="top" align="center" width="${objData.widths[0]}%"><a href="%%=RedirectTo(@Link${objData.sliceID[0]})=%%" target="_blank" alias="${objData.alias[0]}" style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;"><img class="full-width" src="${objData.imgSrc[0]}" alt="${objData.imgAlt[0]}" width="300" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0"></a></td>

                <td valign="top" align="center" width="${objData.widths[1]}%"><a href="%%=RedirectTo(@Link${objData.sliceID[1]})=%%" target="_blank" alias="${objData.alias[1]}" style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;"><img class="full-width" src="${objData.imgSrc[1]}" alt="${objData.imgAlt[1]}" width="300" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0"></a></td>
            </tr>
        </tbody>
    </table>         
        `
    }else{
        // 1 column default
        htmlCode = `
    <!-- Slice ${objData.sliceID} -->
    <table class="full-width" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td valign="top" align="center">
                <a href="%%=RedirectTo(@Link${objData.sliceID})=%%" target="_blank" alias="${objData.alias}" style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;">
                <img class="full-width" src="${objData.imgSrc}" width="600" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0" alt="${objData.imgAlt}">
                </a></td>
            </tr>
        </tbody>
    </table>           
        `
    }
    //console.log(htmlCode);
    //output the code on #emailCode
    $("#emailCode").append(htmlCode);
    

}

function setAmpscript(objData) {

    //if not extra, create links
    if(objData.extraColumn != "extra"){
        //looping through gblObjData
        if(objData.column == 2){
            // 2 columns

            for (let x = 0; x < objData.noDeepLinks.length; x++) {
                //check no deeplinks

                if(objData.noDeepLinks[x].toLowerCase() === 'true'){

                    //no deeplinks
                    gblNoDeepLinks += `\t\tSET @Link${objData.sliceID[x]} = Concat(@www_witchery_com,'${objData.coreLink[x]}',@wyutm)\n` 

                }else{

                    //with deeplinks

                    //gold deeplinks
                    tierLinks.gold += (objData.goldTier[x]) ? `\t\tSET @Link${objData.sliceID[x]} = "${objData.goldTier[x]}"\n` : `\t\tSET @Link${objData.sliceID[x]} = Concat(@www_witchery_com,'${objData.coreLink[x]}',@wyutm)\n`;
                    
                    //silver deeplinks
                    tierLinks.silver += (objData.silverTier[x]) ? `\t\tSET @Link${objData.sliceID[x]} = "${objData.silverTier[x]}"\n` : `\t\tSET @Link${objData.sliceID[x]} = Concat(@www_witchery_com,'${objData.coreLink[x]}',@wyutm)\n`;

                    //bronze deeplinks
                    tierLinks.bronze += (objData.bronzeTier[x]) ? `\t\tSET @Link${objData.sliceID[x]} = "${objData.bronzeTier[x]}"\n` : `\t\tSET @Link${objData.sliceID[x]} = Concat(@www_witchery_com,'${objData.coreLink[x]}',@wyutm)\n`;                

                    //member deeplinksmember
                    tierLinks.member += (objData.memberTier[x]) ? `\t\tSET @Link${objData.sliceID[x]} = "${objData.memberTier[x]}"\n` : `\t\tSET @Link${objData.sliceID[x]} = Concat(@www_witchery_com,'${objData.coreLink[x]}',@wyutm)\n`;                   

                    //other countries links
                    outContriesLinks += `\t\tSET @Link${objData.sliceID[x]} = Concat(@www_witchery_com,'${objData.coreLink[x]}',@wyutm)\n`              
                }

                //checking duplicate links
                linksChecker.push(`@Link${objData.sliceID[x]}`);
                
            }

        }else{

            // 1 column
            //check if theres a deeplink
            if(objData.noDeepLinks.toLowerCase() === 'true'){

                //no deep links
                gblNoDeepLinks += `\t\tSET @Link${objData.sliceID} = Concat(@www_witchery_com,'${objData.coreLink}',@wyutm)\n`            

            }else{
                //gold deeplinks
                if(objData.goldTier){
                    //have value
                    tierLinks.gold += `\t\tSET @Link${objData.sliceID} = "${objData.goldTier}"\n`;
                }else{
                    //get other countries link
                    tierLinks.gold += `\t\tSET @Link${objData.sliceID} = Concat(@www_witchery_com,'${objData.coreLink}',@wyutm)\n`;
                }
                
                //silver deeplinks
                if(objData.silverTier){
                    //have value
                    tierLinks.silver += `\t\tSET @Link${objData.sliceID} = "${objData.silverTier}"\n`;
                }else{
                    //get other countries link
                    tierLinks.silver += `\t\tSET @Link${objData.sliceID} = Concat(@www_witchery_com,'${objData.coreLink}',@wyutm)\n`;
                }
                
                //bronze deeplinks
                if(objData.bronzeTier){
                    //have value
                    tierLinks.bronze += `\t\tSET @Link${objData.sliceID} = "${objData.bronzeTier}"\n`;
                }else{
                    //get other countries link
                    tierLinks.bronze += `\t\tSET @Link${objData.sliceID} = Concat(@www_witchery_com,'${objData.coreLink}',@wyutm)\n`;
                }

                //member deeplinks
                if(objData.memberTier){
                    //have value
                    tierLinks.member += `\t\tSET @Link${objData.sliceID} = "${objData.memberTier}"\n`;
                }else{
                    //get other countries link
                    tierLinks.member += `\t\tSET @Link${objData.sliceID} = Concat(@www_witchery_com,'${objData.coreLink}',@wyutm)\n`;
                }
                
                //other countries links
                outContriesLinks += `\t\tSET @Link${objData.sliceID} = Concat(@www_witchery_com,'${objData.coreLink}',@wyutm)\n`
            }

            //checking duplicate links
            linksChecker.push(`@Link${objData.sliceID}`);

        }  
    }

}

function setTierLinks(tierArray,sliceArray,coreLinkArray){

    let html = ""
    //need to check first if tiers have value
    if(tierArray){
        for (let x = 0; x < tierArray.length; x++) {
        
            if(tierArray[x]){
                //have value
                html += `\t\tSET @Link${sliceArray[x]} = "${tierArray[x]}"\n`;
            }else{
                //no value
                html += `\t\tSET @Link${sliceArray[x]} = Concat(@www_witchery_com,'${coreLinkArray[x]}',@wyutm)\n`
            }
            
        }
    }else{
        //no tier value, means link = coreLink
        html += `\t\tSET @Link${sliceArray[0]} = Concat(@www_witchery_com,'${coreLinkArray[0]}',@wyutm)\n`
        html += `\t\tSET @Link${sliceArray[1]} = Concat(@www_witchery_com,'${coreLinkArray[1]}',@wyutm)\n`
    }
    return html;

}

function printAmpscript(){
 
    let deeplinks = `
\t%%[ /* DEEP LINK CODE */ ]%%
\t<!--%%[

\tIF @Country == "Australia" THEN    

\t\t/* Tiers Links */
\tIF Tier == "Gold" THEN 
${tierLinks.gold}
\tELSEIF Tier == "Silver" THEN
${tierLinks.silver}
\tELSEIF Tier == "Bronze" THEN
${tierLinks.bronze}
\tELSE
${tierLinks.member}
\tENDIF

\tELSE

\t\t/* Set other countries links */
${outContriesLinks}
\tENDIF

\t\t/* No Deep Links */
${gblNoDeepLinks}

\t]%%-->    
    `    

    $("#tempo").text(deeplinks)

}

function generateCode() {
    // Generate a random 5-digits code
    const fiveDigitCode = Math.floor(100000 + Math.random() * 9000);
  
    // Generate 4 random letters
    const randomLetters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  
    // Combine the code and letters
    const generatedCode = `${fiveDigitCode}-${randomLetters}`;
  
    return generatedCode;
}

function loadingScreen(){
    // Show loading screen
    $("#loading-screen").css("display","flex").fadeIn();

    // Set a timeout to remove the loading screen after 2 seconds
    setTimeout(function () {
        $("#loading-screen").fadeOut();
    }, 2000);    

    //scrolling to email preview
    $('html, body').animate({
        scrollTop: $("#emailOutput").offset().top
    }, 500);  

}

function setDataTable(tblData){

    let data = tblData;
    let objTable = {
        column: 0,
        sliceID: "",
        alias: "",
        coreLink: "",
        imgSrc: "",
        imgAlt: "",
        goldTier: "",
        silverTier: "",
        bronzeTier: "",
        memberTier: "",
        noDeepLinks: false,
        extraColumn: ""
    };

    if($(data).attr("data-column") == 2){
        // 2 columns
        //if no sliceID, generate one
        let genSliceID1 = ($(data).find(".leftTable .sliceID").val()) ? $(data).find(".leftTable .sliceID").val() : generateCode();
        let genSliceID2 = ($(data).find(".rightTable .sliceID").val()) ? $(data).find(".rightTable .sliceID").val() : generateCode();

        objTable.column = $.trim($(data).attr("data-column")); //data column
        objTable.widths = [$.trim($(data).find(".widthLeft").val()), $.trim($(data).find(".widthRight").val())]; // column width
        objTable.sliceID = [$.trim(genSliceID1), $.trim(genSliceID2)];//sliceIDs
        objTable.alias = [$.trim(genSliceID1), $.trim(genSliceID2)];//alias
        objTable.coreLink = [$.trim($(data).find(".leftTable .coreLink").val()), $.trim($(data).find(".rightTable .coreLink").val())]; //coreLinks
        objTable.imgSrc = [$.trim($(data).find(".leftTable .imgSrc").val()), $.trim($(data).find(".rightTable .imgSrc").val())];//imgSrcs
        objTable.imgAlt = [$.trim($(data).find(".leftTable .imgAlt").val()), $.trim($(data).find(".rightTable .imgAlt").val())];//imgAlt
        objTable.goldTier = [$.trim($(data).find(".leftTable .goldTier").val()), $.trim($(data).find(".rightTable .goldTier").val())];//goldTier
        objTable.silverTier= [$.trim($(data).find(".leftTable .silverTier").val()), $.trim($(data).find(".rightTable .silverTier").val())];//silverTier
        objTable.bronzeTier = [$.trim($(data).find(".leftTable .bronzeTier").val()), $.trim($(data).find(".rightTable .bronzeTier").val())];//bronzeTier
        objTable.memberTier = [$.trim($(data).find(".leftTable .memberTier").val()), $.trim($(data).find(".rightTable .memberTier").val())];//memberTier
        objTable.noDeepLinks = [$.trim($(data).find(".leftTable .noTier").is(":checked")), $.trim($(data).find(".rightTable .noTier").is(":checked"))]; //noDeepLink
        objTable.extraColumn = ($(data).hasClass("extra")) ? "extra" : ""; //extra

    }else{
        // 1 column default
        //if no sliceID, generate one
        let genSliceID = ($(data).find(".sliceID").val()) ? $(data).find(".sliceID").val() : generateCode();

        //check extra
        let column = ($(data).hasClass("extra")) ? "extra" : $.trim($(data).attr("data-column"));

        objTable.column = column; //data column
        objTable.sliceID = $.trim(genSliceID); //sliceID
        objTable.alias = $.trim(genSliceID); //alias
        objTable.coreLink = $.trim($(data).find(".coreLink").val()); //coreLink
        objTable.imgSrc = $.trim($(data).find(".imgSrc").val()); //imgSrc
        objTable.imgAlt = $.trim($(data).find(".imgAlt").val()); //imgAlt
        objTable.goldTier = $.trim($(data).find(".goldTier").val()); //goldTier
        objTable.silverTier = $.trim($(data).find(".silverTier").val()); //silverTier
        objTable.bronzeTier = $.trim($(data).find(".bronzeTier").val()); //bronzeTier
        objTable.memberTier = $.trim($(data).find(".memberTier").val()); //memberTier   
        objTable.noDeepLinks = $.trim($(data).find(".noTier").is(":checked")); //noDeepLink
        objTable.extraColumn = ($(data).hasClass("extra")) ? "extra" : ""; //extra
    }

        //saving to gblObjData
        gblObjData.push(objTable);

}

function printDataString(){
    let strData = JSON.stringify(gblObjData);
    $('#dataStringText').val($.trim(strData));
    adjustTextareaHeight($('#dataStringText')[0]);
}

function adjustTextareaHeight(el) {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
}

function linksCheck(){
    
    let seen = {};
    let duplicates = "";

    for (let i = 0; i < linksChecker.length; i++) {
        if (seen[linksChecker[i]]) {
            duplicates += `${linksChecker[i]}\n`
        } else {
            seen[linksChecker[i]] = true; // Mark the element as seen
                        
        }
    }

    if(duplicates){
        let html = `
<div class="alert alert-danger" role="alert" id="duplicateLink">
    Duplicate Links Detected:<br>
    ${duplicates}
</div>        
        `
        //prepending the duplicate links alert
        $("#tempo").before(html);
    }

}

// events
$(document).on( 'click', '#oneColumn, #oneColumnExtra', function() {
    //adding form template to the cointainer
    let formTemplate = ($(this).attr("id") == "oneColumn") ? addSliceForm(1) : addSliceForm(1,"extra");
    $("#sliceContainer").append(formTemplate);
});

$(document).on( 'click', '#twoColumn, #twoColumnExtra', function() {
    //adding form template to the cointainer
    let formTemplate = ($(this).attr("id") == "twoColumn") ? addSliceForm(2) : addSliceForm(2,"extra");
    $("#sliceContainer").append(formTemplate);
});

$(document).on( 'click', '.btnClose', function() {
    //removing the form template from the container
    $(this).closest('.sliceForm').remove();
});

$(document).on('input',".sliceID",function(){
    //output slice name based on column
    let column = $(this).closest('.sliceForm').attr("data-column");
    let getID = $(this).attr("data-output");
    if(column == 2){
        //2 columns
        let getdirection = $(this).attr("data-column");
        let getOutput = $('#' + getdirection + '-output-' + getID);
        getOutput.text("Slice: " + $(this).val());
    }else{
        //1 column default
        let getOutput = $('#output-' + getID);
        getOutput.text("Slice: " + $(this).val());
    }

});

$(document).on('click','#btnPrint',function(){
    gblObjData = []; //resetting
    outContriesLinks = ""; //resetting
    gblNoDeepLinks = ""; // resetting
    linksChecker = []; //resetting
    $("#duplicateLink").remove() // removing the alert on duplicate links
    tierLinks = {"gold":"","silver":"","bronze":"","member":""};

    gblSliceTbl.find(".sliceForm").each(function(){
        setDataTable($(this));
    });
    printDataString(); //print on Data String
    //empty email code
    $("#emailCode").empty();

    //loadingScreen
    loadingScreen();    

    //looping on gblObjData to display email and deeplink codes
    for (let x = 0; x < gblObjData.length; x++) {
        emailCode(gblObjData[x]); // appending the html code
        setAmpscript(gblObjData[x]); //setting ampscript
    }
   
    //printing deeplinks
    printAmpscript();

    //check duplicate links
    linksCheck();

});

$(document).on('click', '#copyDataString', function () {
    alert(generateCode());
})

$(document).on('keydown','.widthCol', function(event){
    // Allow only numeric keys (0-9), backspace, and delete
    if (!((event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 8 || event.keyCode === 46 ||
        event.keyCode === 190 || event.keyCode === 110)) {
        event.preventDefault();
    }   

    // Allow only one decimal point
    const currentValue = $(this).val();
    if ((event.keyCode === 190 || event.keyCode === 110) && currentValue.includes('.')) {
        event.preventDefault();
    }
});    

$(document).on( 'mouseenter', 'a', function() {
    var alias = "alias: " + $(this).attr("alias") + "\n\nlink: " + $(this).attr("href") + "\n\nalt: " + $(this).find("img").attr("alt");

    $(this).attr("title",alias);
});

$(document).on('click','#copyEmailCode',function(){

    //removing all the title
    $("#emailCode a").removeAttr("title");

    // Get the HTML content of the source element
    var htmlContent = $('#emailCode').html();

    // Create a temporary textarea element to hold the HTML content
    var tempTextarea = $('<textarea>').text($.trim(htmlContent)).css({
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: 0
    });

    // Append the textarea to the body
    $('body').append(tempTextarea);

    // Select the text in the textarea
    tempTextarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    tempTextarea.remove();

    // Optionally, provide feedback to the user
    alert('HTML content has been copied to the clipboard!');    
});

$(document).on('click','#copyDeepLinkCode',function(){

    // Get the HTML content of the source element
    var htmlContent = $('#tempo').text();

    // Create a temporary textarea element to hold the HTML content
    var tempTextarea = $('<textarea>').text($.trim(htmlContent)).css({
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: 0
    });

    // Append the textarea to the body
    $('body').append(tempTextarea);

    // Select the text in the textarea
    tempTextarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    tempTextarea.remove();

    // Optionally, provide feedback to the user
    alert('Deeplinks content has been copied to the clipboard!');    
});

$(document).on('click','.noTier',function(){
    
    //check if check
    if( $(this).is(":checked") ) {
        //disabled nearby tierlinks
        $(this).closest(".row").find(".memberTier").val("").prop('disabled', true);
        $(this).closest(".row").find(".bronzeTier").val("").prop('disabled', true);
        $(this).closest(".row").find(".silverTier").val("").prop('disabled', true);
        $(this).closest(".row").find(".goldTier").val("").prop('disabled', true);
    }else{
        //enabled nearby tierlinks
        $(this).closest(".row").find(".memberTier").val("").prop('disabled', false);
        $(this).closest(".row").find(".bronzeTier").val("").prop('disabled', false);
        $(this).closest(".row").find(".silverTier").val("").prop('disabled', false);
        $(this).closest(".row").find(".goldTier").val("").prop('disabled', false);        
    }

});