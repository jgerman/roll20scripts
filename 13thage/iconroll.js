on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!iconroll") !== -1) {
      var j = msg.content.replace("!iconroll ", "");
      var icons = JSON.parse(j);
      var iconRolls = new Array();
      
      for (i in icons) {
   
          var icon = icons[i];
          var name = icon["name"];
          var dice = icon["dice"];
          var relation = icon["relation"];
          var rolls = new Array();
          
          for (var idx = 0; idx < dice; idx++) {
             
            var r = randomInteger(6);
            if(r > 4) {
                rolls.push(r);
            }
          }
          
          rolls = rolls.sort().reverse();
          
          if(rolls.length > 0) {
              iconRolls.push("{{"+ name + "=" + formatRolls(rolls) + "}}");
          }
      }
      
      var templateHeader = "&{template:default}{{name=" + msg.who +" Icon Rolls}} ";
      
      if(iconRolls.length < 1) {
          iconRolls.push("{{No Successes}}")
      }
      
    
    sendChat(msg.who, templateHeader + " " + iconRolls.join(" "));
  }
});

function formatRolls(rs) {
    return rs.join(",");
}

