ContactManager.module("ContactsApp.Graph", function(Graph, ContactManager, Backbone, Marionette, $, _){
  Graph.ShowGraph = Marionette.ItemView.extend({
    template: "#graph-view" ,
    className: "graph-ctn"   
    });
});
