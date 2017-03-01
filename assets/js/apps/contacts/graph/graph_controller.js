ContactManager.module("ContactsApp.Graph", function(Graph, ContactManager, Backbone, Marionette, $, _){
  Graph.Controller = {
    showGraph: function() {

      // LOGIC TO CALCULATE GENDERS COUNT
      var males = [];
      var malesCount;
      var females = [];
      var femalesCount;
      var fetchingContact = ContactManager.request("contact:entities");
      var view = new Graph.ShowGraph();
      $.when(fetchingContact).done(function(fetchedContacts){
        var contacts = fetchedContacts.toArray();
      
        contacts.forEach((contact) => {
          if(contact.attributes.gender === "Male") {
            males.push(contact.attributes.gender);
          } else {
            females.push(contact.attributes.gender);
          };
        });

        malesCount = males.length;
        femalesCount = females.length;
      });

      // BAR CHART CODE
      var w = 300;
      var h = 100;
      var padding = 10;
      var dataset = [malesCount, femalesCount];
      var svg = d3.select("#graph-view").append("svg")
                  .attr("width", w)
                  .attr("height", h);

      svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x", (d, i) => {
              return i * (w / dataset.length);
          })
          .attr("y", (d) => {
              return h - (d * 20);
          })
          .attr("width", w / dataset.length - padding)
          .attr("height", (d) => {
              return d * 20;
          })
          .attr("fill", (d) => {
              if(dataset.indexOf(d) === 0) {
                return "blue";
              } else {
                return "pink";
              }
          });

      svg.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
          .text((d) => {
              return d;
          })
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {
              return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
          })
          .attr("y", (d) => {
              return h - (d * 20) + 14;
          })
          .attr("fill", "white")
          .attr("font-size", 14);
      
      ContactManager.regions.main.show(view);
    }
  };
});
