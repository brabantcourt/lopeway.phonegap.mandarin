/*globals $,console,ko,Phrase*/
$(function () {

    "use strict";

    var viewModel;

    viewModel = {
        vocabulary: ko.observable([]),
        randomElement: function () {
            return (viewModel.vocabulary() !== []) ? Math.floor(Math.random() * viewModel.vocabulary().length) : null;
        },
        currentPhrase: ko.observable(null),
        isDisplayed: {
            traditional: ko.observable(true),
            simplified: ko.observable(false),
            pinyin: ko.observable(false),
            english: ko.observable(false)
        },
        click: {
            traditional: function () {
                viewModel.isDisplayed.pinyin(false);
                viewModel.isDisplayed.english(false);
                viewModel.currentPhrase(viewModel.randomElement());
            },
            simplified: function () {

            },
            pinyin: function () {
                viewModel.isDisplayed.pinyin(true);
            },
            english: function () {
                viewModel.isDisplayed.english(true);
            }
        }
    };
    viewModel.initialize = ko.computed(function () {
        this.currentPhrase(this.randomElement());
    }, viewModel);
    viewModel.random = ko.computed(function () {
        return (this.vocabulary() !== null) ? this.vocabulary()[this.currentPhrase()] : null;
    }, viewModel);
    ko.applyBindings(viewModel);

    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json: charset=utf-8",
        cache: false,
        url: "/data/vocab.js",
        success: function (json) {
            viewModel.vocabulary(ko.utils.arrayMap(json, function (jsonItem) { return new Phrase(jsonItem); }));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });

});