
/* - ploneglossary.js - */
// https://www.cca-forum.org/dev/portal_javascripts/ploneglossary.js?original=1
function goto_glossary_definition(definition_index){url=related_glossary_definitions[definition_index]["url"];document.location=url}
function show_glossary_definition_popup(node,definition_index){popup_node=document.createElement("div");popup_node.setAttribute('id',"glossary-definition-popup");title_text=related_glossary_definitions[definition_index]["title"];title_node=document.createElement("h6");title_node.appendChild(document.createTextNode(title_text));popup_node.appendChild(title_node);description_text=related_glossary_definitions[definition_index]["description"];description_node=document.createElement("p");texts=description_text.split('\n')
for(i=0;i<texts.length;i++){text=texts[i];description_node.appendChild(document.createTextNode(text));description_node.appendChild(document.createElement("br"))}
popup_node.appendChild(description_node);node.className=node.className+" glossaryPopupPosition";node.appendChild(popup_node)}
function hide_glossary_definition_popup(node,definition_index){popup_node=document.getElementById("glossary-definition-popup");if(popup_node){node.removeChild(popup_node)}
node.className="highlightedGlossaryTerm"}
function CBrowser(){var ua,s,i;this.isIE=false;this.isNS=false;this.isOP=false;this.version=null;ua=navigator.userAgent;s="Opera";if((i=ua.indexOf(s))>=0){this.isOP=true;this.version=7;return}
s="MSIE";if((i=ua.indexOf(s))>=0){this.isIE=true;this.version=parseFloat(ua.substr(i+s.length));return}
s="Netscape6/";if((i=ua.indexOf(s))>=0){this.isNS=true;this.version=parseFloat(ua.substr(i+s.length));return}
s="Gecko";if((i=ua.indexOf(s))>=0){this.isNS=true;this.version=6.1;return}}
var browser_info=new CBrowser();var related_glossary_definitions=new Array();
function add_related_glossary_definition(title,description,url,terms,show){var definition=new Array();definition["title"]=title;definition["description"]=description;definition["url"]=url;definition["terms"]=terms;definition["show"]=show;related_glossary_definitions.push(definition)}
function highlight_related_glossary_term_in_text(node,word,definition_index){var class_name="highlightedGlossaryTerm";var parent_node=node.parentNode;if(parent_node.className==class_name){return}
var lword=word.toLowerCase();var content_value=node.nodeValue;var lcontent_value=content_value.toLowerCase();var word_bounds=new Array();word_bounds.push('^'+lword+'$');word_bounds.push('\\W'+lword+'\\W');word_bounds.push('^'+lword+'\\W');word_bounds.push('\\W'+lword+'$');var index=-1;for(var i=0;i<word_bounds.length;i++){index=lcontent_value.search(word_bounds[i]);if(index!=-1){if(i==1||i==3){index+=1}
break}}
if(index==-1){return}
var last_index=index+word.length;if(index!=-1){var hiword=document.createElement("span");hiword.className=class_name;hiword.appendChild(document.createTextNode(content_value.substr(index,word.length)));if(browser_info.isIE){hiword.setAttribute("onmouseover", function(){show_glossary_definition_popup(this,definition_index)});hiword.setAttribute("onmouseout", function(){hide_glossary_definition_popup(this,definition_index)});hiword.setAttribute("onclick", function(){goto_glossary_definition(definition_index)})}
else{hiword.setAttribute("onmouseover","javascript:show_glossary_definition_popup(this, "+definition_index+")");hiword.setAttribute("onmouseout","javascript:hide_glossary_definition_popup(this, "+definition_index+")");hiword.setAttribute("onclick","javascript:goto_glossary_definition("+definition_index+")")}
parent_node.insertBefore(document.createTextNode(content_value.substr(0,index)),node);parent_node.insertBefore(hiword,node);parent_node.insertBefore(document.createTextNode(content_value.substr(index+word.length)),node);parent_node.removeChild(node)}}
function highlight_related_glossary_term_in_node(node,word,definition_index,unauthorized_tags){if(!node){return false}
tag_name=node.nodeName.toLowerCase();for(i=0;i<unauthorized_tags.length;i++){unauthorized_tag_name=unauthorized_tags[i].toLowerCase();if(tag_name==unauthorized_tag_name){return false}}
if(node.hasChildNodes){var i;for(i=0;i<node.childNodes.length;i++){highlight_related_glossary_term_in_node(node.childNodes[i],word,definition_index,unauthorized_tags)}
if(node.nodeType==3){highlight_related_glossary_term_in_text(node,word,definition_index)}}
return true}
function highlight_related_glossary_terms_in_node(target_node,unauthorized_tags){for(var def_index=0;def_index<related_glossary_definitions.length;def_index++){var terms=related_glossary_definitions[def_index]["terms"];for(var term_index=0;term_index<terms.length;term_index++){var word=terms[term_index];highlight_related_glossary_term_in_node(target_node,word,def_index,unauthorized_tags)}}}
function build_related_glossary_terms_list(target_node){if(related_glossary_definitions.length>0){var i=0;var ul_node=document.createElement("ul");for(i=0;i<related_glossary_definitions.length;i++){if(related_glossary_definitions[i]["show"]=='1'){var li_node=document.createElement("li");var a_node=document.createElement("a");var url=related_glossary_definitions[i]["url"];a_node.setAttribute("href",url);var title_text=related_glossary_definitions[i]["title"];a_node.appendChild(document.createTextNode(title_text));li_node.appendChild(a_node);ul_node.appendChild(li_node)}}
target_node.appendChild(ul_node)}}

