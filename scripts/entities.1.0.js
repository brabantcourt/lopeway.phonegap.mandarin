/*globals $,ko*/
$(function () {

    "use strict";

    var Phrase;

    Phrase = (function () {
        function Phrase(json) {
            this.traditional = json.T || "";
            this.simplified = json.S || "";
            this.pinyin = json.P;
            this.english = json.E;
            this.confusions = json.C ? $.map(json.C, function (c) { new Phrase(c); }) : null;
            this.lesson = json.L || 0;
        }
        Phrase.prototype.toString = function () {
            return this.traditional + "," + this.simplified + "," + this.pinyin + "," + this.english;
        };
        Phrase.prototype.hashcode = function () {

        };
        return Phrase;
    } ());

    window.Phrase = Phrase;

} ());