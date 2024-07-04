
//global variable
let gblSliceTbl = $("#sliceContainer");
let gblObjData = [];
let outContriesLinks = "";
let insideAU = "";
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
function addSliceForm(col,extra,custom,objData){

    let formTemplate = '';
    let extraData = (extra) ? " extra" : "";
    
    let widths = (objData) ? objData.widths : ["50","50"];
    let sliceID = (objData) ? objData.sliceID : (col==2) ? ["", ""] : "";
    let coreLink = (objData) ? objData.coreLink : (col==2) ? ["", ""] : "";
    let imgSrc = (objData) ? objData.imgSrc : (col==2) ? ["", ""] : "";
    let imgAlt = (objData) ? objData.imgAlt : (col==2) ? ["", ""] : "";
    let goldTier = (objData) ? objData.goldTier : (col==2) ? ["", ""] : "";
    let silverTier = (objData) ? objData.silverTier : (col==2) ? ["", ""] : "";
    let bronzeTier = (objData) ? objData.bronzeTier : (col==2) ? ["", ""] : "";
    let memberTier = (objData) ? objData.memberTier : (col==2) ? ["", ""] : "";
    let noDeepLinks = (objData) ? objData.noDeepLinks : (col==2) ? ["", ""] : "";
    let showStatus = (objData) ? objData.showStatus : "";
    let code = (objData) ? objData.code : "";

    if(col == 2){
        // 2 columns table
        let genCode = generateCode();
        let inputsLeft = "";
        let inputsRight = "";

        let disabledL = (noDeepLinks[0].toString() == "true") ? " disabled":"";
        let disabledR = (noDeepLinks[1].toString() == "true") ? " disabled":"";

        if(disabledL){
            goldTier[0] = "";
            silverTier[0] = "";
            bronzeTier[0] = "";
            memberTier[0] = "";
        }   
        
        if(disabledR){
            goldTier[1] = "";
            silverTier[1] = "";
            bronzeTier[1] = "";
            memberTier[1] = "";
        }          

        if(!extraData){
            inputsLeft = `
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${goldTier[0]}" class="form-control goldTier" placeholder="Gold Deeplink"${disabledL}/>
                <label>Gold Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${silverTier[0]}" class="form-control silverTier" placeholder="Silver Deeplink"${disabledL}/>
                <label>Silver Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${bronzeTier[0]}" class="form-control bronzeTier" placeholder="Bronze Deeplink"${disabledL}/>
                <label>Bronze Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${memberTier[0]}" class="form-control memberTier" placeholder="Member Deeplink"${disabledL}/>
                <label>Member Deeplink - Left</label>
                </div>
            </div>
            </div>
            <div class="col-12">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                        <input class="form-check-input noTier" type="checkbox" value="" id="${genCode}-check-left" ${(noDeepLinks[0].toString() == "true") ? "checked":""}>
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
                <input type="text" value="${goldTier[1]}" class="form-control goldTier" placeholder="Gold Deeplink"${disabledR}/>
                <label>Gold Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${silverTier[1]}" class="form-control silverTier" placeholder="Silver Deeplink"${disabledR}/>
                <label>Silver Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${bronzeTier[1]}" class="form-control bronzeTier" placeholder="Bronze Deeplink"${disabledR}/>
                <label>Bronze Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
            <div class="input-group mb-2">
                <div class="form-floating">
                <input type="text" value="${memberTier[1]}" class="form-control memberTier" placeholder="Member Deeplink"${disabledR}/>
                <label>Member Deeplink - Right</label>
                </div>
            </div>
            </div>
            <div class="col-12">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                        <input class="form-check-input noTier" type="checkbox" value="" id="${genCode}-check-right" ${(noDeepLinks[1].toString() == "true") ? "checked":""}>
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
                    <span class="nameSlice" id="left-output-${genCode}">${(sliceID[0] ? 'Slice: ' + sliceID[0] : '[Slice]')}</span>
                    </a>
                </div>
                <div class="col-6 mb-2">
                    <div class="row">
                        <div class="col text-start"><span class="nameSlice" id="right-output-${genCode}">${(sliceID[1] ? 'Slice: ' + sliceID[1] : '[Slice]')}</span></div>
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
                        <input type="text" class="form-control widthLeft widthCol" placeholder="Width" value="${widths[0]}" />
                        <label>Width - Left (Do not include '%', must have value always)</label>
                        </div>
                    </div>
                    </div>                
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${sliceID[0]}" data-column="left" data-output="${genCode}" class="form-control sliceID" placeholder="Slice ID" />
                        <label>Slice ID - Left (must have unique value)</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${coreLink[0]}" class="form-control coreLink" placeholder="Core Link" ${(extraData) ? "disabled":""}/>
                        <label>Core Link - Left (Please include the necessary "?" and "&")</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${imgSrc[0]}" class="form-control imgSrc" placeholder="Image Source" />
                        <label>Image Source - Left</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${imgAlt[0]}" class="form-control imgAlt" placeholder="Image Alt" />
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
                        <input type="text" class="form-control widthRight widthCol" placeholder="Width" value="${widths[1]}" />
                        <label>Width - Right (Do not include '%', must have value always)</label>
                        </div>
                    </div>
                    </div>                  
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${sliceID[1]}" data-column="right" data-output="${genCode}" class="form-control sliceID" placeholder="Slice ID" />
                        <label>Slice ID - Right (must have unique value)</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${coreLink[1]}" class="form-control coreLink" placeholder="Core Link" ${(extraData) ? "disabled":""}/>
                        <label>Core Link - Right (Please include the necessary "?" and "&")</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${imgSrc[1]}" class="form-control imgSrc" placeholder="Image Source" />
                        <label>Image Source - Right</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <input type="text" value="${imgAlt[1]}" class="form-control imgAlt" placeholder="Image Alt" />
                        <label>Image Alt - Right</label>
                        </div>
                    </div>
                    </div>
                    ${inputsRight}                     
                </div>
                </div>
            </div>    
            <div class="col-12">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                            <input class="form-check-input showStatus" type="checkbox" value="" id="${genCode}-status" ${showStatus.toString() == "true" ? "checked" : ""}>
                            <label class="form-check-label" for="${genCode}-status">
                            Hide this on email
                            </label>
                        </div>
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
        let disabled = (noDeepLinks.toString() == "true") ? " disabled":"";

        if(disabled){
            goldTier = "";
            silverTier = "";
            bronzeTier = "";
            memberTier = "";
        }
        
        //if not extra data. add this inputs
        if(!extraData){
            inputs = `
            <div class="col-6">
            <div class="input-group mb-2">
            <div class="form-floating">
                <input type="text" value="${goldTier}" class="form-control goldTier" placeholder="Gold Deeplink"${disabled}>
                <label>Gold Deeplink</label>
            </div>
            </div>
            </div>  
            <div class="col-6">
                <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" value="${silverTier}" class="form-control silverTier" placeholder="Silver Deeplink"${disabled}>
                    <label>Silver Deeplink</label>
                </div>
                </div>
            </div>    
            <div class="col-6">
                <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" value="${bronzeTier}" class="form-control bronzeTier" placeholder="Bronze Deeplink"${disabled}>
                    <label>Bronze Deeplink</label>
                </div>
                </div>
            </div>  
            <div class="col-6">
                <div class="input-group mb-2">
                <div class="form-floating">
                    <input type="text" value="${memberTier}" class="form-control memberTier" placeholder="Member Deeplink"${disabled}>
                    <label>Member Deeplink</label>
                </div>
                </div>
            </div> 
            <div class="col-6">
                <div class="input-group mb-2">
                    <div class="form-floating">
                        <div class="form-check text-start">
                            <input class="form-check-input noTier" type="checkbox" id="${genCode}-check" ${(noDeepLinks.toString() == "true") ? "checked":""}>
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
                        <span class="nameSlice" id="output-${genCode}">${(sliceID ? 'Slice: ' + sliceID : '[Slice]')}</span>
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
                        <input type="text" value="${sliceID}" data-output="${genCode}" class="form-control sliceID" placeholder="Slice ID (must have unique value)">
                        <label>Slice ID (must have unique value)</label>
                    </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" value="${coreLink}" class="form-control coreLink" placeholder="Core Link" ${(extraData) ? "disabled":""}>
                        <label>Core Link (Please include the necessary "?" and "&")</label>
                    </div>
                    </div>
                </div>        
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" value="${imgSrc}" class="form-control imgSrc" placeholder="Image Source">
                        <label>Image Source</label>
                    </div>
                    </div>
                </div>              
                <div class="col-6">
                    <div class="input-group mb-2">
                    <div class="form-floating">
                        <input type="text" value="${imgAlt}" class="form-control imgAlt" placeholder="Image Alt">
                        <label>Image Alt</label>
                    </div>
                    </div>
                </div>       
                ${inputs}
                <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                            <div class="form-check text-start">
                                <input class="form-check-input showStatus" type="checkbox" value="" id="${genCode}-status" ${showStatus.toString() == "true" ? "checked" : ""}>
                                <label class="form-check-label" for="${genCode}-status">
                                Hide this on email
                                </label>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>    
        `    
    }

    if(custom == "custom"){
        //custom template
        let genCode = generateCode();
        formTemplate = `
        <div class="container custom sliceForm" data-column="custom">
            <div class="row">
                <div class="col-6 text-start mb-2">
                    <a data-bs-toggle="collapse" href="#${genCode}" role="button" aria-expanded="false" aria-controls="${genCode}" class="caretAnchor">
                    <i style="font-size:24px" class="fa pointer scColor caret" title="See Details">&#xf085;</i>
                    <span class="nameSlice">Custom Block</span>
                    </a>
                </div>
                <div class="col-6 text-end mb-2">
                    <i style="font-size:24px" class="fa pointer btnClose">&#xf00d;</i>
                </div>
            </div>
            <div class="row collapse show" id="${genCode}">
                <div class="col-12">
                    <div class="input-group mb-2">
                        <div class="form-floating">
                        <textarea class="form-control customArea" aria-label="With textarea">${code}</textarea>
                        </div>
                    </div>
                </div>  
                <div class="col-12">
                  <div class="input-group mb-2">
                      <div class="form-floating">
                          <div class="form-check text-start">
                              <input class="form-check-input showStatus" type="checkbox" value="" id="${genCode}-status" ${showStatus.toString() == "true" ? "checked" : ""}>
                              <label class="form-check-label" for="${genCode}-status">
                              Hide this on email
                              </label>
                          </div>
                      </div>
                  </div>
                </div>                 
            </div>
        </div>           
        `
    }

    return formTemplate;
}

function emailCode(objData, action){

    let htmlCode = '';

    if(objData.column == 2){
        // 2 Columns
        htmlCode = `
<!-- Slice ${objData.sliceID[0]} ${objData.sliceID[1]} -->      
<table class="full-width" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td valign="top" align="center" width="${objData.widths[0]}%"><a href="{{ Link${objData.sliceID[0]} }}?" target="_blank" {{clicktracking}}style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;"><img class="full-width" src="${objData.imgSrc[0]}" alt="${objData.imgAlt[0]}" width="300" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0"></a></td>

            <td valign="top" align="center" width="${objData.widths[1]}%"><a href="{{ Link${objData.sliceID[1]} }}?" target="_blank" {{clicktracking}}style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;"><img class="full-width" src="${objData.imgSrc[1]}" alt="${objData.imgAlt[1]}" width="300" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0"></a></td>
        </tr>
    </tbody>
</table>         
        `
    }else if(objData.column == "custom"){
        //custom
        let code = objData.code;
        let result = [];

        result = getStringsInCurlyBraces(code);

        //looping through result
        for (let x = 0; x < result.length; x++) {

            let toReplace = result[x];
            let evalFunction = eval("genHtml(" + toReplace + ")");
            code = code.replace(`{${toReplace}}`,evalFunction);
        }


        
        htmlCode = `
<!-- Custom Block -->
${code}
        `
    }else{
        // 1 column default
        htmlCode = `
<!-- Slice ${objData.sliceID} -->
<table class="full-width" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td valign="top" align="center">
            <a href="{{ Link${objData.sliceID} }}?" target="_blank" {{clicktracking}}style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;" >
            <img class="full-width" src="${objData.imgSrc}" width="600" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0" alt="${objData.imgAlt}">
            </a></td>
        </tr>
    </tbody>
</table>           
        `        
    }


    //console.log(htmlCode);
    
    if(action == "append"){
        //check if needs to show
        //console.log(objData.showStatus);
        if(objData.showStatus.toString() == "false"){
            //display html
            //output the code on #emailCode
            $("#emailCode").append(htmlCode);            
        }
    }else{
        //return html
        return htmlCode;
    }
    
    

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
                    gblNoDeepLinks += `\t\t{% assign Link${objData.sliceID[x]} = BaseURL | append: '${objData.coreLink[x]}' %}\n`; 

                }else{
                    //with deeplinks

                    //checking if all tier have deeplinks
                    if(objData.goldTier[x] && objData.silverTier[x] && objData.bronzeTier[x] && objData.memberTier[x]){
                        tierLinks.gold += `\t\t{% assign Link${objData.sliceID[x]} = '${objData.goldTier[x]}' %}\n`;
                        tierLinks.silver += `\t\t{% assign Link${objData.sliceID[x]} = '${objData.silverTier[x]}' %}\n`;
                        tierLinks.bronze += `\t\t{% assign Link${objData.sliceID[x]} = '${objData.bronzeTier[x]}' %}\n`;
                        tierLinks.member += `\t\t{% assign Link${objData.sliceID[x]} = '${objData.memberTier[x]}' %}\n`;
                    }else{
                        //if only one or three of the tier have deeplink, only assign one variable for them
                        //putting the value
                        let tlinks = [objData.goldTier[x], objData.silverTier[x], objData.bronzeTier[x], objData.memberTier[x]];
                        let insideLink = '';

                        for (let l = 0; l < tlinks.length; l++) {
                            //have value, then save
                            if(tlinks[l]){
                                insideLink = `\t\t{% assign Link${objData.sliceID[x]} = '${tlinks[l]}'  %}\n`;
                            }
                            
                        }

                        insideAU += insideLink;
                    }               

                    //other countries links
                    outContriesLinks += `\t\t{% assign Link${objData.sliceID[x]} = BaseURL | append: '${objData.coreLink[x]}' %}\n`;              
                }

                //checking duplicate links
                linksChecker.push(`Link${objData.sliceID[x]}`);
                
            }

        }else{

            // 1 column
            //check if theres a deeplink
            if(objData.noDeepLinks.toLowerCase() === 'true'){

                //no deep links
                gblNoDeepLinks += `\t\t{% assign Link${objData.sliceID} = BaseURL | append: '${objData.coreLink}' %}\n`;            

            }else{

                //checking if all tier have deeplinks
                if(objData.goldTier && objData.silverTier && objData.bronzeTier && objData.memberTier){
                    tierLinks.gold += `\t\t{% assign Link${objData.sliceID} = '${objData.goldTier}' %}\n`;
                    tierLinks.silver += `\t\t{% assign Link${objData.sliceID} = '${objData.silverTier}' %}\n`;
                    tierLinks.bronze += `\t\t{% assign Link${objData.sliceID} = '${objData.bronzeTier}' %}\n`;
                    tierLinks.member += `\t\t{% assign Link${objData.sliceID} = '${objData.memberTier}' %}\n`;
                }else{
                    //if only one or three of the tier have deeplink, only assign one variable for them
                    //putting the value
                    let tlinks = [objData.goldTier, objData.silverTier, objData.bronzeTier, objData.memberTier];
                    let insideLink = '';

                    for (let l = 0; l < tlinks.length; l++) {
                        //have value, then save
                        if(tlinks[l]){
                            insideLink = `\t\t{% assign Link${objData.sliceID} = '${tlinks[l]}' %}\n`
                        }
                        
                    }

                    insideAU += insideLink;

                }
                
                //other countries links
                outContriesLinks += `\t\t{% assign Link${objData.sliceID} = BaseURL | append: '${objData.coreLink}' %}\n`
            }

            //checking duplicate links
            linksChecker.push(`Link${objData.sliceID}`);

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
                html += `\t\t{% assign Link${sliceArray[x]} = '${tierArray[x]}' %}\n`;
            }else{
                //no value
                html += `\t\t{% assign Link${sliceArray[x]} = BaseURL | append: '${coreLinkArray[x]}' %}\n`
            }
            
        }
    }else{
        //no tier value, means link = coreLink
        html += `\t\t{% assign Link${sliceArray[0]} = BaseURL | append: '${coreLinkArray[0]}' %}\n`
        html += `\t\t{% assign Link${sliceArray[1]} = BaseURL | append: '${coreLinkArray[1]}' %}\n`
    }
    return html;

}

function printAmpscript(){
 console.log(tierLinks.gold.length + " " + tierLinks.silver.length + " " + tierLinks.bronze.length + " " + tierLinks.member.length);

    let tier = '';
    //check if needed to add the tier  conditions
    if(tierLinks.gold.length > 0 && tierLinks.silver.length > 0 && tierLinks.bronze.length > 0 && tierLinks.member.length > 0){
        tier = `
\t\t{% comment %} Tiers Links {% endcomment %} 

\t\t{% case tier %}
\t\t{% when 'Gold' %}
${tierLinks.gold}
\t\t{% when 'Silver' %}
${tierLinks.silver}
\t\t{% when 'Bronze' %}
${tierLinks.bronze}
\t\t{% else %}
${tierLinks.member}
\t\t{% endcase %}   

        `
    }

    let deeplinks = `
\t{% comment %} Deep link code {% endcomment %}
\t<!--
\t{% assign clicktracking = 'clicktracking=off ' %}

\t{% if \${country} == 'AU' %}  
${tier}
${insideAU}
\t{% else %}

\t\t{% comment %} Set other countries links {% endcomment %}
${outContriesLinks}
\t{% endif %}

\t\t{% comment %} No Deep Links {% endcomment %}
${gblNoDeepLinks}

\t--> 
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

function loadingScreen(text,action){
    // Show loading screen
    $("#loading-screen").css("display","flex").fadeIn();
    
    $("#LoadingText").text(text);
    
    let idOut = "";
    if(action == "generate"){
        idOut = "'#emailOutput'"
    }else{
        idOut = "'#sliceContainer'"
    }

    // Set a timeout to remove the loading screen after 2 seconds
    setTimeout(function () {
        $("#loading-screen").fadeOut();
    }, 2000);    

    //scrolling to email preview
    $('html, body').animate({
        scrollTop: $(eval(idOut)).offset().top - 70
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
        extraColumn: "",
        showStatus: false
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
        objTable.showStatus = $.trim($(data).find(".showStatus").is(":checked"));

    }else if($(data).attr("data-column") == "custom"){
        // custom block

        //if no sliceID, generate one
        let genSliceID = ($(data).find(".sliceID").val()) ? $(data).find(".sliceID").val() : generateCode();
        objTable.sliceID = $.trim(genSliceID); //sliceID
        objTable.code = $.trim($(data).find(".customArea").val()); //code
        objTable.column = "custom"; //tag as custom column
        objTable.showStatus = $.trim($(data).find(".showStatus").is(":checked")); //showstatus


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
        objTable.showStatus = $.trim($(data).find(".showStatus").is(":checked")); //showstatus
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

function retrieveData(sliceId){

    let data = {};

    for (let x = 0; x < gblObjData.length; x++) {
        
        //first match

        //check if array(means 2 column)
        if(Array.isArray(gblObjData[x].sliceID)){

            for (let y = 0; y < gblObjData[x].sliceID.length; y++) {

                if(gblObjData[x].sliceID[y].toString() == sliceId.toString()){

                    //looping through keys in array
                    for(let prop in gblObjData[x]){
                        //check if array (column key is the only value that is not an array)
                        if(Array.isArray(gblObjData[x][prop])){
                            //means array
                            //console.log(prop + " = " + gblObjData[x][prop][y])
                            data[prop] = gblObjData[x][prop][y];
                            //console.log(data.prop)
                        }else{
                            //not array
                            //console.log(prop + " = " + gblObjData[x][prop])
                            data[prop] = gblObjData[x][prop];
                            //console.log(data.prop)
                        }

                    }

                    break;
                }  
                
            }

        }else{
            //one column
            if(gblObjData[x].sliceID.toString() == sliceId.toString()){
                data = gblObjData[x];
                break;
            }            
        }
        
    }    
    
    return data;

}

function getData(sliceId, propertyName){
    let data = {};
    let dataVal = "";
    data = retrieveData(parseInt(sliceId));

    if(!data.sliceID){
        //no data found
        dataVal = "<span style='color:red; font-size:12px;'><b>No Data Found</b></span>"
    }else{
        dataVal = data[propertyName];
    }


    return dataVal;
}

function genHtml(sliceId){

    let html = ""
    let data = retrieveData(sliceId);
    let link = `{{ Link${data.sliceID} }}`
    let width = (data.widths) ? "300" : "600";
    let imgSrc = data.imgSrc;
    let imgAlt = data.imgAlt;
    let alias = data.alias;


    html = `
\t\t\t<a href="${link}" target="_blank" style="font-family:Avenir, Helvetica, Arial, sans-serif; font-size:12px; color:#000000;">
\t\t\t\t<img class="full-width" src="${imgSrc}" width="${width}" height="auto" style="display: block; color: #54565b; font-family: sans-serif; font-size: 24px; width: 100%; max-width: 100%; margin: 0 !important;" border="0" alt="${imgAlt}">
\t\t\t</a>        
        `

    //overwriting the html if no data found
    if(!data.sliceID){
        //no data found
        html = "<span style='color:red; font-size:12px;'><b>No Data Found</b></span>"
    } 

    //console.log(html)

    return $.trim(html);

}

function getStringsInCurlyBraces(str) {
    const results = [];
    let startIndex = 0;
    
    // Loop until all instances of '{' are found
    while ((startIndex = str.indexOf('{', startIndex)) !== -1) {
        // Find the index of the corresponding '}'
        const endIndex = str.indexOf('}', startIndex);
        
        // Check if both '{' and '}' are present and if '{' comes before '}'
        if (endIndex !== -1 && startIndex < endIndex) {
            // Extract the string between '{' and '}'
            const substring = str.substring(startIndex + 1, endIndex);
            results.push(substring);
            
            // Move the startIndex to the next position after '}'
            startIndex = endIndex + 1;
        } else {
            // If '{' or '}' is missing or in the wrong order, move startIndex to the next position
            startIndex++;
        }
    }
    
    return results;
}

// events
$(document).on( 'click', '#oneColumn, #oneColumnExtra', function() {
    //adding form template to the cointainer
    let formTemplate = ($(this).attr("id") == "oneColumn") ? addSliceForm(1) : addSliceForm(1,"extra");
    $("#sliceContainer").append(formTemplate);
});

$(document).on('click','#oneColumnCustom', function(){
    //adding form template to the cointainer
    let formTemplate = addSliceForm(0,"","custom");
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
    insideAU = ""; //resetting
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
    loadingScreen("Generating . . .","generate");    

    //looping on gblObjData to display email and deeplink codes
    for (let x = 0; x < gblObjData.length; x++) {
        emailCode(gblObjData[x], "append"); // appending the html code
        //check if needed to add ampscript
        if(gblObjData[x].column != "custom"){
            setAmpscript(gblObjData[x]); //setting ampscript
        }
        
    }
   
    //printing deeplinks
    printAmpscript();

    //check duplicate links
    linksCheck();

});

$(document).on('click', '#copyDataString', function () {

    // Get the HTML content of the source element
    var htmlContent = $('#dataStringText').val();
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
    alert('Email Data has been copied to the clipboard!');

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

$(document).on('click','#LoadData',function(){
    //resetting first
    $(".sliceForm").remove();
    $("#emailCode").empty(); 
    $("#tempo").text("");
    gblObjData = [];

    //getting the value string then parse it into json
    let jsonDataString = $("#dataStringText").val() ? JSON.parse($.trim($("#dataStringText").val())) : "";  
    gblObjData = jsonDataString;

    loadingScreen("Loading Slices . . .","loading"); 

    //looping to each data
    for (let x = 0; x < gblObjData.length; x++) {
        $("#sliceContainer").append(addSliceForm(gblObjData[x].column,gblObjData[x].extraColumn,gblObjData[x].column,gblObjData[x])); // adding slices
    }
    

});
