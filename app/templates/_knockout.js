/**
 * Created by holeinone1200 on 10/30/14.
 */
define([
    <% if(includejQuery) { %> "jquery" <% } %>,
    "knockout"], function($, ko) {

    var viewModel = {
        status: ko.observable('active')
    };

    ko.applyBindings(viewModel, $('html')[0]);
});