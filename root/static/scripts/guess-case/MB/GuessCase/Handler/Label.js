/*
   This file is part of MusicBrainz, the open internet music database.
   Copyright (c) 2005 Stefan Kestenholz (keschte)
   Copyright (C) 2010 MetaBrainz Foundation

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

*/

MB.GuessCase = (MB.GuessCase) ? MB.GuessCase : {};
MB.GuessCase.Handler = (MB.GuessCase.Handler) ? MB.GuessCase.Handler : {};

/**
 * Label specific GuessCase functionality
 **/
MB.GuessCase.Handler.Label = function () {
    var self = MB.GuessCase.Handler.Base();

    // ----------------------------------------------------------------------------
    // member functions
    // ---------------------------------------------------------------------------

    /**
     * Guess the label name given in string is, and
     * returns the guessed name.
     *
     * @param   is        the inputstring
     * @returns os        the processed string
     **/
    self.process = function (is) {
        is = gc.artistmode.preProcessCommons(is);
        var w = gc.i.splitWordsAndPunctuation(is);
        gc.o.init();
        gc.i.init(is, w);
        while (!gc.i.isIndexAtEnd()) {
            self.processWord();
        }
        var os = gc.o.getOutput();
        return gc.artistmode.runPostProcess(os);
    };

    /**
     * Checks special cases of labels
     * - empty, unknown -> [unknown]
     * - none, no label, not applicable, n/a -> [no label]
     **/
    self.checkSpecialCase = function (is) {
        if (is) {
            if (!gc.re.LABEL_EMPTY) {
                // match empty
                gc.re.LABEL_EMPTY = /^\s*$/i;
                // match "unknown" and variants
                gc.re.LABEL_UNKNOWN = /^[\(\[]?\s*Unknown\s*[\)\]]?$/i;
                // match "none" and variants
                gc.re.LABEL_NONE = /^[\(\[]?\s*none\s*[\)\]]?$/i;
                // match "no label" and variants
                gc.re.LABEL_NOLABEL = /^[\(\[]?\s*no[\s-]+label\s*[\)\]]?$/i;
                // match "not applicable" and variants
                gc.re.LABEL_NOTAPPLICABLE = /^[\(\[]?\s*not[\s-]+applicable\s*[\)\]]?$/i;
                // match "n/a" and variants
                gc.re.LABEL_NA = /^[\(\[]?\s*n\s*[\\\/]\s*a\s*[\)\]]?$/i;
            }
            var os = is;
            if (is.match(gc.re.LABEL_EMPTY)) {
                return self.SPECIALCASE_UNKNOWN;

            } else if (is.match(gc.re.LABEL_UNKNOWN)) {
                return self.SPECIALCASE_UNKNOWN;

            } else if (is.match(gc.re.LABEL_NONE)) {
                return self.SPECIALCASE_UNKNOWN;

            } else if (is.match(gc.re.LABEL_NOLABEL)) {
                return self.SPECIALCASE_UNKNOWN;

            } else if (is.match(gc.re.LABEL_NOTAPPLICABLE)) {
                return self.SPECIALCASE_UNKNOWN;

            } else if (is.match(gc.re.LABEL_NA)) {
                return self.SPECIALCASE_UNKNOWN;
            }
        }
        return self.NOT_A_SPECIALCASE;
    };

    /**
     * Delegate function which handles words not handled
     * in the common word handlers.
     *
     * - Handles VersusStyle
     *
     **/
    self.doWord = function () {
        if (self.doVersusStyle()) {
        } else if (self.doPresentsStyle()) {
        } else {
            // no special case, append
            gc.o.appendSpaceIfNeeded();
            gc.i.capitalizeCurrentWord();
            gc.o.appendCurrentWord();
        }
        gc.f.resetContext();
        gc.f.number = false;
        gc.f.forceCaps = false;
        gc.f.spaceNextWord = true;
        return null;
    };

    /**
     * Reformat pres/presents -> presents
     *
     * - Handles DiscNumberStyle (DiscNumberWithNameStyle)
     * - Handles FeaturingArtistStyle
     * - Handles VersusStyle
     * - Handles VolumeNumberStyle
     * - Handles PartNumberStyle
     *
     **/
    self.doPresentsStyle = function () {
        if (!self.doPresentsRE) {
            self.doPresentsRE = /^(presents?|pres)$/i;
        }
        if (gc.i.matchCurrentWord(self.doPresentsRE)) {
            gc.o.appendSpace();
            gc.o.appendWord("presents");
            if (gc.i.isNextWord(".")) {
                gc.i.nextIndex();
            }
            return true;
        }
        return false;
    };

    /**
     * Guesses the sortname for label aliases
     **/
    self.guessSortName = function (is) {
        return self.sortCompoundName(is, self.moveArticleToEnd);
    };

    return self;
};
