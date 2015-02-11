!function(a) {
    if ("function" === typeof define && define.amd) define([ "jquery" ], a); else if ("object" === typeof module && "object" === typeof module.exports) module.exports = a(require("jquery")); else a(jQuery);
}(function(a) {
    "use strict";
    a.extend({
        tablesorter: new function() {
            var b = this;
            b.version = "2.18.4";
            b.parsers = [];
            b.widgets = [];
            b.defaults = {
                theme: "default",
                widthFixed: false,
                showProcessing: false,
                headerTemplate: "{content}",
                onRenderTemplate: null,
                onRenderHeader: null,
                cancelSelection: true,
                tabIndex: true,
                dateFormat: "mmddyyyy",
                sortMultiSortKey: "shiftKey",
                sortResetKey: "ctrlKey",
                usNumberFormat: true,
                delayInit: false,
                serverSideSorting: false,
                headers: {},
                ignoreCase: true,
                sortForce: null,
                sortList: [],
                sortAppend: null,
                sortStable: false,
                sortInitialOrder: "asc",
                sortLocaleCompare: false,
                sortReset: false,
                sortRestart: false,
                emptyTo: "bottom",
                stringTo: "max",
                textExtraction: "basic",
                textAttribute: "data-text",
                textSorter: null,
                numberSorter: null,
                widgets: [],
                widgetOptions: {
                    zebra: [ "even", "odd" ]
                },
                initWidgets: true,
                widgetClass: "widget-{name}",
                initialized: null,
                tableClass: "",
                cssAsc: "",
                cssDesc: "",
                cssNone: "",
                cssHeader: "",
                cssHeaderRow: "",
                cssProcessing: "",
                cssChildRow: "tablesorter-childRow",
                cssIcon: "tablesorter-icon",
                cssIconNone: "",
                cssIconAsc: "",
                cssIconDesc: "",
                cssInfoBlock: "tablesorter-infoOnly",
                cssAllowClicks: "tablesorter-allowClicks",
                cssIgnoreRow: "tablesorter-ignoreRow",
                selectorHeaders: "> thead th, > thead td",
                selectorSort: "th, td",
                selectorRemove: ".remove-me",
                debug: false,
                headerList: [],
                empties: {},
                strings: {},
                parsers: []
            };
            b.css = {
                table: "tablesorter",
                cssHasChild: "tablesorter-hasChildRow",
                childRow: "tablesorter-childRow",
                header: "tablesorter-header",
                headerRow: "tablesorter-headerRow",
                headerIn: "tablesorter-header-inner",
                icon: "tablesorter-icon",
                info: "tablesorter-infoOnly",
                processing: "tablesorter-processing",
                sortAsc: "tablesorter-headerAsc",
                sortDesc: "tablesorter-headerDesc",
                sortNone: "tablesorter-headerUnSorted"
            };
            b.language = {
                sortAsc: "Ascending sort applied, ",
                sortDesc: "Descending sort applied, ",
                sortNone: "No sort applied, ",
                nextAsc: "activate to apply an ascending sort",
                nextDesc: "activate to apply a descending sort",
                nextNone: "activate to remove the sort"
            };
            function c() {
                var a = arguments[0], b = arguments.length > 1 ? Array.prototype.slice.call(arguments) : a;
                if ("undefined" !== typeof console && "undefined" !== typeof console.log) console[/error/i.test(a) ? "error" : /warn/i.test(a) ? "warn" : "log"](b); else alert(b);
            }
            function d(a, b) {
                c(a + " (" + (new Date().getTime() - b.getTime()) + "ms)");
            }
            b.log = c;
            b.benchmark = d;
            function e(a) {
                for (var b in a) return false;
                return true;
            }
            function f(c, d, e) {
                if (!d) return "";
                var f, g = c.config, h = g.textExtraction || "", i = "";
                if ("basic" === h) i = a(d).attr(g.textAttribute) || d.textContent || d.innerText || a(d).text() || ""; else if ("function" === typeof h) i = h(d, c, e); else if ("function" === typeof (f = b.getColumnData(c, h, e))) i = f(d, c, e); else i = d.textContent || d.innerText || a(d).text() || "";
                return a.trim(i);
            }
            function g(d, e, g, h) {
                var i, j, k = b.parsers.length, l = false, m = "", n = true;
                while ("" === m && n) {
                    g++;
                    if (e[g]) {
                        l = e[g].cells[h];
                        m = f(d, l, h);
                        j = a(l);
                        if (d.config.debug) c("Checking if value was empty on row " + g + ", column: " + h + ': "' + m + '"');
                    } else n = false;
                }
                while (--k >= 0) {
                    i = b.parsers[k];
                    if (i && "text" !== i.id && i.is && i.is(m, d, l, j)) return i;
                }
                return b.getParserById("text");
            }
            function h(a) {
                var e = a.config, f = e.$tbodies = e.$table.children("tbody:not(." + e.cssInfoBlock + ")"), h, i, j, k, l, m, n, o, p, q, r = 0, s = "", t = f.length;
                if (0 === t) return e.debug ? c("Warning: *Empty table!* Not building a parser cache") : ""; else if (e.debug) {
                    q = new Date();
                    c("Detecting parsers for each column");
                }
                i = {
                    extractors: [],
                    parsers: []
                };
                while (r < t) {
                    h = f[r].rows;
                    if (h[r]) {
                        j = e.columns;
                        for (k = 0; k < j; k++) {
                            l = e.$headers.filter('[data-column="' + k + '"]:last');
                            m = b.getColumnData(a, e.headers, k);
                            p = b.getParserById(b.getData(l, m, "extractor"));
                            o = b.getParserById(b.getData(l, m, "sorter"));
                            n = "false" === b.getData(l, m, "parser");
                            e.empties[k] = (b.getData(l, m, "empty") || e.emptyTo || (e.emptyToBottom ? "bottom" : "top")).toLowerCase();
                            e.strings[k] = (b.getData(l, m, "string") || e.stringTo || "max").toLowerCase();
                            if (n) o = b.getParserById("no-parser");
                            if (!p) p = false;
                            if (!o) o = g(a, h, -1, k);
                            if (e.debug) s += "column:" + k + "; extractor:" + p.id + "; parser:" + o.id + "; string:" + e.strings[k] + "; empty: " + e.empties[k] + "\n";
                            i.parsers[k] = o;
                            i.extractors[k] = p;
                        }
                    }
                    r += i.parsers.length ? t : 1;
                }
                if (e.debug) {
                    c(s ? s : "No parsers detected");
                    d("Completed detecting parsers", q);
                }
                e.parsers = i.parsers;
                e.extractors = i.extractors;
            }
            function i(e) {
                var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = e.config, v = u.$table.children("tbody"), w = u.extractors, x = u.parsers;
                u.cache = {};
                u.totalRows = 0;
                if (!x) return u.debug ? c("Warning: *Empty table!* Not building a cache") : "";
                if (u.debug) q = new Date();
                if (u.showProcessing) b.isProcessing(e, true);
                for (m = 0; m < v.length; m++) {
                    t = [];
                    g = u.cache[m] = {
                        normalized: []
                    };
                    if (!v.eq(m).hasClass(u.cssInfoBlock)) {
                        r = v[m] && v[m].rows.length || 0;
                        for (k = 0; k < r; ++k) {
                            s = {
                                child: []
                            };
                            n = a(v[m].rows[k]);
                            o = [ new Array(u.columns) ];
                            p = [];
                            if (n.hasClass(u.cssChildRow) && 0 !== k) {
                                h = g.normalized.length - 1;
                                g.normalized[h][u.columns].$row = g.normalized[h][u.columns].$row.add(n);
                                if (!n.prev().hasClass(u.cssChildRow)) n.prev().addClass(b.css.cssHasChild);
                                s.child[h] = a.trim(n[0].textContent || n[0].innerText || n.text() || "");
                                continue;
                            }
                            s.$row = n;
                            s.order = k;
                            for (l = 0; l < u.columns; ++l) {
                                if ("undefined" === typeof x[l]) {
                                    if (u.debug) c("No parser found for cell:", n[0].cells[l], "does it have a header?");
                                    continue;
                                }
                                h = f(e, n[0].cells[l], l);
                                if ("undefined" === typeof w[l].id) i = h; else i = w[l].format(h, e, n[0].cells[l], l);
                                j = "no-parser" === x[l].id ? "" : x[l].format(i, e, n[0].cells[l], l);
                                p.push(u.ignoreCase && "string" === typeof j ? j.toLowerCase() : j);
                                if ("numeric" === (x[l].type || "").toLowerCase()) t[l] = Math.max(Math.abs(j) || 0, t[l] || 0);
                            }
                            p[u.columns] = s;
                            g.normalized.push(p);
                        }
                        g.colMax = t;
                        u.totalRows += g.normalized.length;
                    }
                }
                if (u.showProcessing) b.isProcessing(e);
                if (u.debug) d("Building cache for " + r + " rows", q);
            }
            function j(c, f) {
                var g = c.config, h = g.widgetOptions, i = c.tBodies, j = [], k = g.cache, l, m, n, o, p, q, r;
                if (e(k)) return g.appender ? g.appender(c, j) : c.isUpdating ? g.$table.trigger("updateComplete", c) : "";
                if (g.debug) r = new Date();
                for (q = 0; q < i.length; q++) {
                    n = a(i[q]);
                    if (n.length && !n.hasClass(g.cssInfoBlock)) {
                        o = b.processTbody(c, n, true);
                        l = k[q].normalized;
                        m = l.length;
                        for (p = 0; p < m; p++) {
                            j.push(l[p][g.columns].$row);
                            if (!g.appender || g.pager && (!g.pager.removeRows || !h.pager_removeRows) && !g.pager.ajax) o.append(l[p][g.columns].$row);
                        }
                        b.processTbody(c, o, false);
                    }
                }
                if (g.appender) g.appender(c, j);
                if (g.debug) d("Rebuilt table", r);
                if (!f && !g.appender) b.applyWidget(c);
                if (c.isUpdating) g.$table.trigger("updateComplete", c);
            }
            function k(a) {
                return /^d/i.test(a) || 1 === a;
            }
            function l(e) {
                var f, g, h, i, j, l, m, o = e.config;
                o.headerList = [];
                o.headerContent = [];
                if (o.debug) m = new Date();
                o.columns = b.computeColumnIndex(o.$table.children("thead, tfoot").children("tr"));
                i = o.cssIcon ? '<i class="' + (o.cssIcon === b.css.icon ? b.css.icon : o.cssIcon + " " + b.css.icon) + '"></i>' : "";
                o.$headers = a(a.map(a(e).find(o.selectorHeaders), function(c, d) {
                    g = a(c);
                    if (g.parent().hasClass(o.cssIgnoreRow)) return;
                    f = b.getColumnData(e, o.headers, d, true);
                    o.headerContent[d] = g.html();
                    if ("" !== o.headerTemplate) {
                        j = o.headerTemplate.replace(/\{content\}/g, g.html()).replace(/\{icon\}/g, i);
                        if (o.onRenderTemplate) {
                            h = o.onRenderTemplate.apply(g, [ d, j ]);
                            if (h && "string" === typeof h) j = h;
                        }
                        g.html('<div class="' + b.css.headerIn + '">' + j + "</div>");
                    }
                    if (o.onRenderHeader) o.onRenderHeader.apply(g, [ d, o, o.$table ]);
                    c.column = parseInt(g.attr("data-column"), 10);
                    c.order = k(b.getData(g, f, "sortInitialOrder") || o.sortInitialOrder) ? [ 1, 0, 2 ] : [ 0, 1, 2 ];
                    c.count = -1;
                    c.lockedOrder = false;
                    l = b.getData(g, f, "lockedOrder") || false;
                    if ("undefined" !== typeof l && false !== l) c.order = c.lockedOrder = k(l) ? [ 1, 1, 1 ] : [ 0, 0, 0 ];
                    g.addClass(b.css.header + " " + o.cssHeader);
                    o.headerList[d] = c;
                    g.parent().addClass(b.css.headerRow + " " + o.cssHeaderRow).attr("role", "row");
                    if (o.tabIndex) g.attr("tabindex", 0);
                    return c;
                }));
                a(e).find(o.selectorHeaders).attr({
                    scope: "col",
                    role: "columnheader"
                });
                n(e);
                if (o.debug) {
                    d("Built headers:", m);
                    c(o.$headers);
                }
            }
            function m(a, b, c) {
                var d = a.config;
                d.$table.find(d.selectorRemove).remove();
                h(a);
                i(a);
                v(d.$table, b, c);
            }
            function n(c) {
                var d, e, f, g = c.config;
                g.$headers.each(function(h, i) {
                    e = a(i);
                    f = b.getColumnData(c, g.headers, h, true);
                    d = "false" === b.getData(i, f, "sorter") || "false" === b.getData(i, f, "parser");
                    i.sortDisabled = d;
                    e[d ? "addClass" : "removeClass"]("sorter-false").attr("aria-disabled", "" + d);
                    if (c.id) if (d) e.removeAttr("aria-controls"); else e.attr("aria-controls", c.id);
                });
            }
            function o(c) {
                var d, e, f, g = c.config, h = g.sortList, i = h.length, j = b.css.sortNone + " " + g.cssNone, k = [ b.css.sortAsc + " " + g.cssAsc, b.css.sortDesc + " " + g.cssDesc ], l = [ g.cssIconAsc, g.cssIconDesc, g.cssIconNone ], m = [ "ascending", "descending" ], n = a(c).find("tfoot tr").children().add(g.$extraHeaders).removeClass(k.join(" "));
                g.$headers.removeClass(k.join(" ")).addClass(j).attr("aria-sort", "none").find("." + g.cssIcon).removeClass(l.join(" ")).addClass(l[2]);
                for (e = 0; e < i; e++) if (2 !== h[e][1]) {
                    d = g.$headers.not(".sorter-false").filter('[data-column="' + h[e][0] + '"]' + (1 === i ? ":last" : ""));
                    if (d.length) {
                        for (f = 0; f < d.length; f++) if (!d[f].sortDisabled) d.eq(f).removeClass(j).addClass(k[h[e][1]]).attr("aria-sort", m[h[e][1]]).find("." + g.cssIcon).removeClass(l[2]).addClass(l[h[e][1]]);
                        if (n.length) n.filter('[data-column="' + h[e][0] + '"]').removeClass(j).addClass(k[h[e][1]]);
                    }
                }
                g.$headers.not(".sorter-false").each(function() {
                    var c = a(this), d = this.order[(this.count + 1) % (g.sortReset ? 3 : 2)], e = c.text() + ": " + b.language[c.hasClass(b.css.sortAsc) ? "sortAsc" : c.hasClass(b.css.sortDesc) ? "sortDesc" : "sortNone"] + b.language[0 === d ? "nextAsc" : 1 === d ? "nextDesc" : "nextNone"];
                    c.attr("aria-label", e);
                });
            }
            function p(b) {
                var c, d, e = b.config;
                if (e.widthFixed && 0 === e.$table.children("colgroup").length) {
                    c = a("<colgroup>");
                    d = a(b).width();
                    a(b.tBodies).not("." + e.cssInfoBlock).find("tr:first").children(":visible").each(function() {
                        c.append(a("<col>").css("width", parseInt(a(this).width() / d * 1e3, 10) / 10 + "%"));
                    });
                    e.$table.prepend(c);
                }
            }
            function q(b, c) {
                var d, e, f, g, h, i = b.config, j = c || i.sortList;
                i.sortList = [];
                a.each(j, function(b, c) {
                    g = parseInt(c[0], 10);
                    f = i.$headers.filter('[data-column="' + g + '"]:last')[0];
                    if (f) {
                        e = ("" + c[1]).match(/^(1|d|s|o|n)/);
                        e = e ? e[0] : "";
                        switch (e) {
                          case "1":
                          case "d":
                            e = 1;
                            break;

                          case "s":
                            e = h || 0;
                            break;

                          case "o":
                            d = f.order[(h || 0) % (i.sortReset ? 3 : 2)];
                            e = 0 === d ? 1 : 1 === d ? 0 : 2;
                            break;

                          case "n":
                            f.count = f.count + 1;
                            e = f.order[f.count % (i.sortReset ? 3 : 2)];
                            break;

                          default:
                            e = 0;
                        }
                        h = 0 === b ? e : h;
                        d = [ g, parseInt(e, 10) || 0 ];
                        i.sortList.push(d);
                        e = a.inArray(d[1], f.order);
                        f.count = e >= 0 ? e : d[1] % (i.sortReset ? 3 : 2);
                    }
                });
            }
            function r(a, b) {
                return a && a[b] ? a[b].type || "" : "";
            }
            function s(c, d, e) {
                if (c.isUpdating) return setTimeout(function() {
                    s(c, d, e);
                }, 50);
                var f, g, h, i, k, l = c.config, m = !e[l.sortMultiSortKey], n = l.$table;
                n.trigger("sortStart", c);
                d.count = e[l.sortResetKey] ? 2 : (d.count + 1) % (l.sortReset ? 3 : 2);
                if (l.sortRestart) {
                    g = d;
                    l.$headers.each(function() {
                        if (this !== g && (m || !a(this).is("." + b.css.sortDesc + ",." + b.css.sortAsc))) this.count = -1;
                    });
                }
                g = parseInt(a(d).attr("data-column"), 10);
                if (m) {
                    l.sortList = [];
                    if (null !== l.sortForce) {
                        f = l.sortForce;
                        for (h = 0; h < f.length; h++) if (f[h][0] !== g) l.sortList.push(f[h]);
                    }
                    i = d.order[d.count];
                    if (i < 2) {
                        l.sortList.push([ g, i ]);
                        if (d.colSpan > 1) for (h = 1; h < d.colSpan; h++) l.sortList.push([ g + h, i ]);
                    }
                } else {
                    if (l.sortAppend && l.sortList.length > 1) for (h = 0; h < l.sortAppend.length; h++) {
                        k = b.isValueInArray(l.sortAppend[h][0], l.sortList);
                        if (k >= 0) l.sortList.splice(k, 1);
                    }
                    if (b.isValueInArray(g, l.sortList) >= 0) for (h = 0; h < l.sortList.length; h++) {
                        k = l.sortList[h];
                        i = l.$headers.filter('[data-column="' + k[0] + '"]:last')[0];
                        if (k[0] === g) {
                            k[1] = i.order[d.count];
                            if (2 === k[1]) {
                                l.sortList.splice(h, 1);
                                i.count = -1;
                            }
                        }
                    } else {
                        i = d.order[d.count];
                        if (i < 2) {
                            l.sortList.push([ g, i ]);
                            if (d.colSpan > 1) for (h = 1; h < d.colSpan; h++) l.sortList.push([ g + h, i ]);
                        }
                    }
                }
                if (null !== l.sortAppend) {
                    f = l.sortAppend;
                    for (h = 0; h < f.length; h++) if (f[h][0] !== g) l.sortList.push(f[h]);
                }
                n.trigger("sortBegin", c);
                setTimeout(function() {
                    o(c);
                    t(c);
                    j(c);
                    n.trigger("sortEnd", c);
                }, 1);
            }
            function t(a) {
                var c, f, g, h, i, j, k, l, m, n, o, p = 0, q = a.config, s = q.textSorter || "", t = q.sortList, u = t.length, v = a.tBodies.length;
                if (q.serverSideSorting || e(q.cache)) return;
                if (q.debug) i = new Date();
                for (f = 0; f < v; f++) {
                    j = q.cache[f].colMax;
                    k = q.cache[f].normalized;
                    k.sort(function(d, e) {
                        for (c = 0; c < u; c++) {
                            h = t[c][0];
                            l = t[c][1];
                            p = 0 === l;
                            if (q.sortStable && d[h] === e[h] && 1 === u) return d[q.columns].order - e[q.columns].order;
                            g = /n/i.test(r(q.parsers, h));
                            if (g && q.strings[h]) {
                                if ("boolean" === typeof q.string[q.strings[h]]) g = (p ? 1 : -1) * (q.string[q.strings[h]] ? -1 : 1); else g = q.strings[h] ? q.string[q.strings[h]] || 0 : 0;
                                m = q.numberSorter ? q.numberSorter(d[h], e[h], p, j[h], a) : b["sortNumeric" + (p ? "Asc" : "Desc")](d[h], e[h], g, j[h], h, a);
                            } else {
                                n = p ? d : e;
                                o = p ? e : d;
                                if ("function" === typeof s) m = s(n[h], o[h], p, h, a); else if ("object" === typeof s && s.hasOwnProperty(h)) m = s[h](n[h], o[h], p, h, a); else m = b["sortNatural" + (p ? "Asc" : "Desc")](d[h], e[h], h, a, q);
                            }
                            if (m) return m;
                        }
                        return d[q.columns].order - e[q.columns].order;
                    });
                }
                if (q.debug) d("Sorting on " + t.toString() + " and dir " + l + " time", i);
            }
            function u(b, c) {
                var d = b[0];
                if (d.isUpdating) b.trigger("updateComplete", d);
                if (a.isFunction(c)) c(b[0]);
            }
            function v(a, c, d) {
                var e = a[0].config.sortList;
                if (false !== c && !a[0].isProcessing && e.length) a.trigger("sorton", [ e, function() {
                    u(a, d);
                }, true ]); else {
                    u(a, d);
                    b.applyWidget(a[0], false);
                }
            }
            function w(c) {
                var d = c.config, g = d.$table;
                g.unbind("sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(d.namespace + " ")).bind("sortReset" + d.namespace, function(b, e) {
                    b.stopPropagation();
                    d.sortList = [];
                    o(c);
                    t(c);
                    j(c);
                    if (a.isFunction(e)) e(c);
                }).bind("updateAll" + d.namespace, function(a, e, f) {
                    a.stopPropagation();
                    c.isUpdating = true;
                    b.refreshWidgets(c, true, true);
                    b.restoreHeaders(c);
                    l(c);
                    b.bindEvents(c, d.$headers, true);
                    w(c);
                    m(c, e, f);
                }).bind("update" + d.namespace + " updateRows" + d.namespace, function(a, b, d) {
                    a.stopPropagation();
                    c.isUpdating = true;
                    n(c);
                    m(c, b, d);
                }).bind("updateCell" + d.namespace, function(b, e, h, i) {
                    b.stopPropagation();
                    c.isUpdating = true;
                    g.find(d.selectorRemove).remove();
                    var j, k, l, m, n = g.find("tbody"), o = a(e), p = n.index(a.fn.closest ? o.closest("tbody") : o.parents("tbody").filter(":first")), q = a.fn.closest ? o.closest("tr") : o.parents("tr").filter(":first");
                    e = o[0];
                    if (n.length && p >= 0) {
                        l = n.eq(p).find("tr").index(q);
                        m = o.index();
                        d.cache[p].normalized[l][d.columns].$row = q;
                        if ("undefined" === typeof d.extractors[m].id) k = f(c, e, m); else k = d.extractors[m].format(f(c, e, m), c, e, m);
                        j = "no-parser" === d.parsers[m].id ? "" : d.parsers[m].format(k, c, e, m);
                        d.cache[p].normalized[l][m] = d.ignoreCase && "string" === typeof j ? j.toLowerCase() : j;
                        if ("numeric" === (d.parsers[m].type || "").toLowerCase()) d.cache[p].colMax[m] = Math.max(Math.abs(j) || 0, d.cache[p].colMax[m] || 0);
                        v(g, h, i);
                    }
                }).bind("addRows" + d.namespace, function(b, i, j, k) {
                    b.stopPropagation();
                    c.isUpdating = true;
                    if (e(d.cache)) {
                        n(c);
                        m(c, j, k);
                    } else {
                        i = a(i).attr("role", "row");
                        var l, o, p, q, r, s, t, u = i.filter("tr").length, w = g.find("tbody").index(i.parents("tbody").filter(":first"));
                        if (!(d.parsers && d.parsers.length)) h(c);
                        for (l = 0; l < u; l++) {
                            p = i[l].cells.length;
                            t = [];
                            s = {
                                child: [],
                                $row: i.eq(l),
                                order: d.cache[w].normalized.length
                            };
                            for (o = 0; o < p; o++) {
                                if ("undefined" === typeof d.extractors[o].id) q = f(c, i[l].cells[o], o); else q = d.extractors[o].format(f(c, i[l].cells[o], o), c, i[l].cells[o], o);
                                r = "no-parser" === d.parsers[o].id ? "" : d.parsers[o].format(q, c, i[l].cells[o], o);
                                t[o] = d.ignoreCase && "string" === typeof r ? r.toLowerCase() : r;
                                if ("numeric" === (d.parsers[o].type || "").toLowerCase()) d.cache[w].colMax[o] = Math.max(Math.abs(t[o]) || 0, d.cache[w].colMax[o] || 0);
                            }
                            t.push(s);
                            d.cache[w].normalized.push(t);
                        }
                        v(g, j, k);
                    }
                }).bind("updateComplete" + d.namespace, function() {
                    c.isUpdating = false;
                }).bind("sorton" + d.namespace, function(d, f, h, k) {
                    var l = c.config;
                    d.stopPropagation();
                    g.trigger("sortStart", this);
                    q(c, f);
                    o(c);
                    if (l.delayInit && e(l.cache)) i(c);
                    g.trigger("sortBegin", this);
                    t(c);
                    j(c, k);
                    g.trigger("sortEnd", this);
                    b.applyWidget(c);
                    if (a.isFunction(h)) h(c);
                }).bind("appendCache" + d.namespace, function(b, d, e) {
                    b.stopPropagation();
                    j(c, e);
                    if (a.isFunction(d)) d(c);
                }).bind("updateCache" + d.namespace, function(b, e) {
                    if (!(d.parsers && d.parsers.length)) h(c);
                    i(c);
                    if (a.isFunction(e)) e(c);
                }).bind("applyWidgetId" + d.namespace, function(a, e) {
                    a.stopPropagation();
                    b.getWidgetById(e).format(c, d, d.widgetOptions);
                }).bind("applyWidgets" + d.namespace, function(a, d) {
                    a.stopPropagation();
                    b.applyWidget(c, d);
                }).bind("refreshWidgets" + d.namespace, function(a, d, e) {
                    a.stopPropagation();
                    b.refreshWidgets(c, d, e);
                }).bind("destroy" + d.namespace, function(a, d, e) {
                    a.stopPropagation();
                    b.destroy(c, d, e);
                }).bind("resetToLoadState" + d.namespace, function() {
                    b.refreshWidgets(c, true, true);
                    d = a.extend(true, b.defaults, d.originalSettings);
                    c.hasInitialized = false;
                    b.setup(c, d);
                });
            }
            b.construct = function(c) {
                return this.each(function() {
                    var d = this, e = a.extend(true, {}, b.defaults, c);
                    e.originalSettings = c;
                    if (!d.hasInitialized && b.buildTable && "TABLE" !== this.tagName) b.buildTable(d, e); else b.setup(d, e);
                });
            };
            b.setup = function(d, e) {
                if (!d || !d.tHead || 0 === d.tBodies.length || true === d.hasInitialized) return e.debug ? c("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized") : "";
                var f = "", g = a(d), j = a.metadata;
                d.hasInitialized = false;
                d.isProcessing = true;
                d.config = e;
                a.data(d, "tablesorter", e);
                if (e.debug) a.data(d, "startoveralltimer", new Date());
                e.supportsDataObject = function(a) {
                    a[0] = parseInt(a[0], 10);
                    return a[0] > 1 || 1 === a[0] && parseInt(a[1], 10) >= 4;
                }(a.fn.jquery.split("."));
                e.string = {
                    max: 1,
                    min: -1,
                    emptymin: 1,
                    emptymax: -1,
                    zero: 0,
                    none: 0,
                    "null": 0,
                    top: true,
                    bottom: false
                };
                e.emptyTo = e.emptyTo.toLowerCase();
                e.stringTo = e.stringTo.toLowerCase();
                if (!/tablesorter\-/.test(g.attr("class"))) f = "" !== e.theme ? " tablesorter-" + e.theme : "";
                e.table = d;
                e.$table = g.addClass(b.css.table + " " + e.tableClass + f).attr("role", "grid");
                e.$headers = g.find(e.selectorHeaders);
                if (!e.namespace) e.namespace = ".tablesorter" + Math.random().toString(16).slice(2); else e.namespace = "." + e.namespace.replace(/\W/g, "");
                e.$table.children().children("tr").attr("role", "row");
                e.$tbodies = g.children("tbody:not(." + e.cssInfoBlock + ")").attr({
                    "aria-live": "polite",
                    "aria-relevant": "all"
                });
                if (e.$table.children("caption").length) {
                    f = e.$table.children("caption")[0];
                    if (!f.id) f.id = e.namespace.slice(1) + "caption";
                    e.$table.attr("aria-labelledby", f.id);
                }
                e.widgetInit = {};
                e.textExtraction = e.$table.attr("data-text-extraction") || e.textExtraction || "basic";
                l(d);
                p(d);
                h(d);
                e.totalRows = 0;
                if (!e.delayInit) i(d);
                b.bindEvents(d, e.$headers, true);
                w(d);
                if (e.supportsDataObject && "undefined" !== typeof g.data().sortlist) e.sortList = g.data().sortlist; else if (j && g.metadata() && g.metadata().sortlist) e.sortList = g.metadata().sortlist;
                b.applyWidget(d, true);
                if (e.sortList.length > 0) g.trigger("sorton", [ e.sortList, {}, !e.initWidgets, true ]); else {
                    o(d);
                    if (e.initWidgets) b.applyWidget(d, false);
                }
                if (e.showProcessing) g.unbind("sortBegin" + e.namespace + " sortEnd" + e.namespace).bind("sortBegin" + e.namespace + " sortEnd" + e.namespace, function(a) {
                    clearTimeout(e.processTimer);
                    b.isProcessing(d);
                    if ("sortBegin" === a.type) e.processTimer = setTimeout(function() {
                        b.isProcessing(d, true);
                    }, 500);
                });
                d.hasInitialized = true;
                d.isProcessing = false;
                if (e.debug) b.benchmark("Overall initialization time", a.data(d, "startoveralltimer"));
                g.trigger("tablesorter-initialized", d);
                if ("function" === typeof e.initialized) e.initialized(d);
            };
            b.getColumnData = function(b, c, d, e, f) {
                if ("undefined" === typeof c || null === c) return;
                b = a(b)[0];
                var g, h, i = b.config, j = f || i.$headers;
                if (c[d]) return e ? c[d] : c[j.index(j.filter('[data-column="' + d + '"]:last'))];
                for (h in c) if ("string" === typeof h) {
                    g = j.filter('[data-column="' + d + '"]:last').filter(h).add(j.filter('[data-column="' + d + '"]:last').find(h));
                    if (g.length) return c[h];
                }
                return;
            };
            b.computeColumnIndex = function(b) {
                var c = [], d = {}, e = 0, f, g, h, i, j, k, l, m, n, o, p, q, r;
                for (f = 0; f < b.length; f++) {
                    l = b[f].cells;
                    for (g = 0; g < l.length; g++) {
                        k = l[g];
                        j = a(k);
                        m = k.parentNode.rowIndex;
                        n = m + "-" + j.index();
                        o = k.rowSpan || 1;
                        p = k.colSpan || 1;
                        if ("undefined" === typeof c[m]) c[m] = [];
                        for (h = 0; h < c[m].length + 1; h++) if ("undefined" === typeof c[m][h]) {
                            q = h;
                            break;
                        }
                        d[n] = q;
                        e = Math.max(q, e);
                        j.attr({
                            "data-column": q
                        });
                        for (h = m; h < m + o; h++) {
                            if ("undefined" === typeof c[h]) c[h] = [];
                            r = c[h];
                            for (i = q; i < q + p; i++) r[i] = "x";
                        }
                    }
                }
                return e + 1;
            };
            b.isProcessing = function(c, d, e) {
                c = a(c);
                var f = c[0].config, g = e || c.find("." + b.css.header);
                if (d) {
                    if ("undefined" !== typeof e && f.sortList.length > 0) g = g.filter(function() {
                        return this.sortDisabled ? false : b.isValueInArray(parseFloat(a(this).attr("data-column")), f.sortList) >= 0;
                    });
                    c.add(g).addClass(b.css.processing + " " + f.cssProcessing);
                } else c.add(g).removeClass(b.css.processing + " " + f.cssProcessing);
            };
            b.processTbody = function(b, c, d) {
                b = a(b)[0];
                var e;
                if (d) {
                    b.isProcessing = true;
                    c.before('<span class="tablesorter-savemyplace"/>');
                    e = a.fn.detach ? c.detach() : c.remove();
                    return e;
                }
                e = a(b).find("span.tablesorter-savemyplace");
                c.insertAfter(e);
                e.remove();
                b.isProcessing = false;
            };
            b.clearTableBody = function(b) {
                a(b)[0].config.$tbodies.children().detach();
            };
            b.bindEvents = function(b, c, d) {
                b = a(b)[0];
                var f, g = b.config;
                if (true !== d) g.$extraHeaders = g.$extraHeaders ? g.$extraHeaders.add(c) : c;
                c.find(g.selectorSort).add(c.filter(g.selectorSort)).unbind("mousedown mouseup sort keyup ".split(" ").join(g.namespace + " ")).bind("mousedown mouseup sort keyup ".split(" ").join(g.namespace + " "), function(d, h) {
                    var j, k = d.type;
                    if (1 !== (d.which || d.button) && !/sort|keyup/.test(k) || "keyup" === k && 13 !== d.which) return;
                    if ("mouseup" === k && true !== h && new Date().getTime() - f > 250) return;
                    if ("mousedown" === k) {
                        f = new Date().getTime();
                        return /(input|select|button|textarea)/i.test(d.target.tagName) || a(d.target).closest("td,th").hasClass(g.cssAllowClicks) ? "" : !g.cancelSelection;
                    }
                    if (g.delayInit && e(g.cache)) i(b);
                    j = a.fn.closest ? a(this).closest("th, td")[0] : /TH|TD/.test(this.tagName) ? this : a(this).parents("th, td")[0];
                    j = g.$headers[c.index(j)];
                    if (!j.sortDisabled) s(b, j, d);
                });
                if (g.cancelSelection) c.attr("unselectable", "on").bind("selectstart", false).css({
                    "user-select": "none",
                    MozUserSelect: "none"
                });
            };
            b.restoreHeaders = function(c) {
                var d = a(c)[0].config;
                d.$table.find(d.selectorHeaders).each(function(c) {
                    if (a(this).find("." + b.css.headerIn).length) a(this).html(d.headerContent[c]);
                });
            };
            b.destroy = function(c, d, e) {
                c = a(c)[0];
                if (!c.hasInitialized) return;
                b.refreshWidgets(c, true, true);
                var f = a(c), g = c.config, h = f.find("thead:first"), i = h.find("tr." + b.css.headerRow).removeClass(b.css.headerRow + " " + g.cssHeaderRow), j = f.find("tfoot:first > tr").children("th, td");
                if (false === d && a.inArray("uitheme", g.widgets) >= 0) {
                    f.trigger("applyWidgetId", [ "uitheme" ]);
                    f.trigger("applyWidgetId", [ "zebra" ]);
                }
                h.find("tr").not(i).remove();
                f.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState ".split(" ").join(g.namespace + " "));
                g.$headers.add(j).removeClass([ b.css.header, g.cssHeader, g.cssAsc, g.cssDesc, b.css.sortAsc, b.css.sortDesc, b.css.sortNone ].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled", "true");
                i.find(g.selectorSort).unbind("mousedown mouseup keypress ".split(" ").join(g.namespace + " "));
                b.restoreHeaders(c);
                f.toggleClass(b.css.table + " " + g.tableClass + " tablesorter-" + g.theme, false === d);
                c.hasInitialized = false;
                delete c.config.cache;
                if ("function" === typeof e) e(c);
            };
            b.regex = {
                chunk: /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
                chunks: /(^\\0|\\0$)/,
                hex: /^0x[0-9a-f]+$/i
            };
            b.sortNatural = function(a, c) {
                if (a === c) return 0;
                var d, e, f, g, h, i, j, k, l = b.regex;
                if (l.hex.test(c)) {
                    e = parseInt(a.match(l.hex), 16);
                    g = parseInt(c.match(l.hex), 16);
                    if (e < g) return -1;
                    if (e > g) return 1;
                }
                d = a.replace(l.chunk, "\\0$1\\0").replace(l.chunks, "").split("\\0");
                f = c.replace(l.chunk, "\\0$1\\0").replace(l.chunks, "").split("\\0");
                k = Math.max(d.length, f.length);
                for (j = 0; j < k; j++) {
                    h = isNaN(d[j]) ? d[j] || 0 : parseFloat(d[j]) || 0;
                    i = isNaN(f[j]) ? f[j] || 0 : parseFloat(f[j]) || 0;
                    if (isNaN(h) !== isNaN(i)) return isNaN(h) ? 1 : -1;
                    if (typeof h !== typeof i) {
                        h += "";
                        i += "";
                    }
                    if (h < i) return -1;
                    if (h > i) return 1;
                }
                return 0;
            };
            b.sortNaturalAsc = function(a, c, d, e, f) {
                if (a === c) return 0;
                var g = f.string[f.empties[d] || f.emptyTo];
                if ("" === a && 0 !== g) return "boolean" === typeof g ? g ? -1 : 1 : -g || -1;
                if ("" === c && 0 !== g) return "boolean" === typeof g ? g ? 1 : -1 : g || 1;
                return b.sortNatural(a, c);
            };
            b.sortNaturalDesc = function(a, c, d, e, f) {
                if (a === c) return 0;
                var g = f.string[f.empties[d] || f.emptyTo];
                if ("" === a && 0 !== g) return "boolean" === typeof g ? g ? -1 : 1 : g || 1;
                if ("" === c && 0 !== g) return "boolean" === typeof g ? g ? 1 : -1 : -g || -1;
                return b.sortNatural(c, a);
            };
            b.sortText = function(a, b) {
                return a > b ? 1 : a < b ? -1 : 0;
            };
            b.getTextValue = function(a, b, c) {
                if (c) {
                    var d, e = a ? a.length : 0, f = c + b;
                    for (d = 0; d < e; d++) f += a.charCodeAt(d);
                    return b * f;
                }
                return 0;
            };
            b.sortNumericAsc = function(a, c, d, e, f, g) {
                if (a === c) return 0;
                var h = g.config, i = h.string[h.empties[f] || h.emptyTo];
                if ("" === a && 0 !== i) return "boolean" === typeof i ? i ? -1 : 1 : -i || -1;
                if ("" === c && 0 !== i) return "boolean" === typeof i ? i ? 1 : -1 : i || 1;
                if (isNaN(a)) a = b.getTextValue(a, d, e);
                if (isNaN(c)) c = b.getTextValue(c, d, e);
                return a - c;
            };
            b.sortNumericDesc = function(a, c, d, e, f, g) {
                if (a === c) return 0;
                var h = g.config, i = h.string[h.empties[f] || h.emptyTo];
                if ("" === a && 0 !== i) return "boolean" === typeof i ? i ? -1 : 1 : i || 1;
                if ("" === c && 0 !== i) return "boolean" === typeof i ? i ? 1 : -1 : -i || -1;
                if (isNaN(a)) a = b.getTextValue(a, d, e);
                if (isNaN(c)) c = b.getTextValue(c, d, e);
                return c - a;
            };
            b.sortNumeric = function(a, b) {
                return a - b;
            };
            b.characterEquivalents = {
                a: "áàâãäąå",
                A: "ÁÀÂÃÄĄÅ",
                c: "çćč",
                C: "ÇĆČ",
                e: "éèêëěę",
                E: "ÉÈÊËĚĘ",
                i: "íìİîïı",
                I: "ÍÌİÎÏ",
                o: "óòôõö",
                O: "ÓÒÔÕÖ",
                ss: "ß",
                SS: "ẞ",
                u: "úùûüů",
                U: "ÚÙÛÜŮ"
            };
            b.replaceAccents = function(a) {
                var c, d = "[", e = b.characterEquivalents;
                if (!b.characterRegex) {
                    b.characterRegexArray = {};
                    for (c in e) if ("string" === typeof c) {
                        d += e[c];
                        b.characterRegexArray[c] = new RegExp("[" + e[c] + "]", "g");
                    }
                    b.characterRegex = new RegExp(d + "]");
                }
                if (b.characterRegex.test(a)) for (c in e) if ("string" === typeof c) a = a.replace(b.characterRegexArray[c], c);
                return a;
            };
            b.isValueInArray = function(a, b) {
                var c, d = b.length;
                for (c = 0; c < d; c++) if (b[c][0] === a) return c;
                return -1;
            };
            b.addParser = function(a) {
                var c, d = b.parsers.length, e = true;
                for (c = 0; c < d; c++) if (b.parsers[c].id.toLowerCase() === a.id.toLowerCase()) e = false;
                if (e) b.parsers.push(a);
            };
            b.getParserById = function(a) {
                if ("false" == a) return false;
                var c, d = b.parsers.length;
                for (c = 0; c < d; c++) if (b.parsers[c].id.toLowerCase() === a.toString().toLowerCase()) return b.parsers[c];
                return false;
            };
            b.addWidget = function(a) {
                b.widgets.push(a);
            };
            b.hasWidget = function(b, c) {
                b = a(b);
                return b.length && b[0].config && b[0].config.widgetInit[c] || false;
            };
            b.getWidgetById = function(a) {
                var c, d, e = b.widgets.length;
                for (c = 0; c < e; c++) {
                    d = b.widgets[c];
                    if (d && d.hasOwnProperty("id") && d.id.toLowerCase() === a.toLowerCase()) return d;
                }
            };
            b.applyWidget = function(c, e) {
                c = a(c)[0];
                var f = c.config, g = f.widgetOptions, h = " " + f.table.className + " ", i = [], j, k, l, m;
                if (false !== e && c.hasInitialized && (c.isApplyingWidgets || c.isUpdating)) return;
                if (f.debug) j = new Date();
                m = new RegExp("\\s" + f.widgetClass.replace(/\{name\}/i, "([\\w-]+)") + "\\s", "g");
                if (h.match(m)) {
                    l = h.match(m);
                    if (l) a.each(l, function(a, b) {
                        f.widgets.push(b.replace(m, "$1"));
                    });
                }
                if (f.widgets.length) {
                    c.isApplyingWidgets = true;
                    f.widgets = a.grep(f.widgets, function(b, c) {
                        return a.inArray(b, f.widgets) === c;
                    });
                    a.each(f.widgets || [], function(a, c) {
                        m = b.getWidgetById(c);
                        if (m && m.id) {
                            if (!m.priority) m.priority = 10;
                            i[a] = m;
                        }
                    });
                    i.sort(function(a, b) {
                        return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
                    });
                    a.each(i, function(d, h) {
                        if (h) {
                            if (e || !f.widgetInit[h.id]) {
                                f.widgetInit[h.id] = true;
                                if (h.hasOwnProperty("options")) g = c.config.widgetOptions = a.extend(true, {}, h.options, g);
                                if (h.hasOwnProperty("init")) {
                                    if (f.debug) k = new Date();
                                    h.init(c, h, f, g);
                                    if (f.debug) b.benchmark("Initializing " + h.id + " widget", k);
                                }
                            }
                            if (!e && h.hasOwnProperty("format")) {
                                if (f.debug) k = new Date();
                                h.format(c, f, g, false);
                                if (f.debug) b.benchmark((e ? "Initializing " : "Applying ") + h.id + " widget", k);
                            }
                        }
                    });
                }
                setTimeout(function() {
                    c.isApplyingWidgets = false;
                    a.data(c, "lastWidgetApplication", new Date());
                }, 0);
                if (f.debug) {
                    l = f.widgets.length;
                    d("Completed " + (true === e ? "initializing " : "applying ") + l + " widget" + (1 !== l ? "s" : ""), j);
                }
            };
            b.refreshWidgets = function(d, e, f) {
                d = a(d)[0];
                var g, h = d.config, i = h.widgets, j = b.widgets, k = j.length;
                for (g = 0; g < k; g++) if (j[g] && j[g].id && (e || a.inArray(j[g].id, i) < 0)) {
                    if (h.debug) c('Refeshing widgets: Removing "' + j[g].id + '"');
                    if (j[g].hasOwnProperty("remove") && h.widgetInit[j[g].id]) {
                        j[g].remove(d, h, h.widgetOptions);
                        h.widgetInit[j[g].id] = false;
                    }
                }
                if (true !== f) b.applyWidget(d, e);
            };
            b.getData = function(b, c, d) {
                var e = "", f = a(b), g, h;
                if (!f.length) return "";
                g = a.metadata ? f.metadata() : false;
                h = " " + (f.attr("class") || "");
                if ("undefined" !== typeof f.data(d) || "undefined" !== typeof f.data(d.toLowerCase())) e += f.data(d) || f.data(d.toLowerCase()); else if (g && "undefined" !== typeof g[d]) e += g[d]; else if (c && "undefined" !== typeof c[d]) e += c[d]; else if (" " !== h && h.match(" " + d + "-")) e = h.match(new RegExp("\\s" + d + "-([\\w-]+)"))[1] || "";
                return a.trim(e);
            };
            b.formatFloat = function(b, c) {
                if ("string" !== typeof b || "" === b) return b;
                var d, e = c && c.config ? false !== c.config.usNumberFormat : "undefined" !== typeof c ? c : true;
                if (e) b = b.replace(/,/g, ""); else b = b.replace(/[\s|\.]/g, "").replace(/,/g, ".");
                if (/^\s*\([.\d]+\)/.test(b)) b = b.replace(/^\s*\(([.\d]+)\)/, "-$1");
                d = parseFloat(b);
                return isNaN(d) ? a.trim(b) : d;
            };
            b.isDigit = function(a) {
                return isNaN(a) ? /^[\-+(]?\d+[)]?$/.test(a.toString().replace(/[,.'"\s]/g, "")) : true;
            };
        }()
    });
    var b = a.tablesorter;
    a.fn.extend({
        tablesorter: b.construct
    });
    b.addParser({
        id: "no-parser",
        is: function() {
            return false;
        },
        format: function() {
            return "";
        },
        type: "text"
    });
    b.addParser({
        id: "text",
        is: function() {
            return true;
        },
        format: function(c, d) {
            var e = d.config;
            if (c) {
                c = a.trim(e.ignoreCase ? c.toLocaleLowerCase() : c);
                c = e.sortLocaleCompare ? b.replaceAccents(c) : c;
            }
            return c;
        },
        type: "text"
    });
    b.addParser({
        id: "digit",
        is: function(a) {
            return b.isDigit(a);
        },
        format: function(c, d) {
            var e = b.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), d);
            return c && "number" === typeof e ? e : c ? a.trim(c && d.config.ignoreCase ? c.toLocaleLowerCase() : c) : c;
        },
        type: "numeric"
    });
    b.addParser({
        id: "currency",
        is: function(a) {
            return /^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((a || "").replace(/[+\-,. ]/g, ""));
        },
        format: function(c, d) {
            var e = b.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), d);
            return c && "number" === typeof e ? e : c ? a.trim(c && d.config.ignoreCase ? c.toLocaleLowerCase() : c) : c;
        },
        type: "numeric"
    });
    b.addParser({
        id: "url",
        is: function(a) {
            return /^(https?|ftp|file):\/\//.test(a);
        },
        format: function(b) {
            return b ? a.trim(b.replace(/(https?|ftp|file):\/\//, "")) : b;
        },
        parsed: true,
        type: "text"
    });
    b.addParser({
        id: "isoDate",
        is: function(a) {
            return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(a);
        },
        format: function(a, b) {
            var c = a ? new Date(a.replace(/-/g, "/")) : a;
            return c instanceof Date && isFinite(c) ? c.getTime() : a;
        },
        type: "numeric"
    });
    b.addParser({
        id: "percent",
        is: function(a) {
            return /(\d\s*?%|%\s*?\d)/.test(a) && a.length < 15;
        },
        format: function(a, c) {
            return a ? b.formatFloat(a.replace(/%/g, ""), c) : a;
        },
        type: "numeric"
    });
    b.addParser({
        id: "image",
        is: function(a, b, c, d) {
            return d.find("img").length > 0;
        },
        format: function(b, c, d) {
            return a(d).find("img").attr(c.config.imgAttr || "alt") || b;
        },
        parsed: true,
        type: "text"
    });
    b.addParser({
        id: "usLongDate",
        is: function(a) {
            return /^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(a) || /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(a);
        },
        format: function(a, b) {
            var c = a ? new Date(a.replace(/(\S)([AP]M)$/i, "$1 $2")) : a;
            return c instanceof Date && isFinite(c) ? c.getTime() : a;
        },
        type: "numeric"
    });
    b.addParser({
        id: "shortDate",
        is: function(a) {
            return /(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((a || "").replace(/\s+/g, " ").replace(/[\-.,]/g, "/"));
        },
        format: function(a, c, d, e) {
            if (a) {
                var f, g, h = c.config, i = h.$headers.filter("[data-column=" + e + "]:last"), j = i.length && i[0].dateFormat || b.getData(i, b.getColumnData(c, h.headers, e), "dateFormat") || h.dateFormat;
                g = a.replace(/\s+/g, " ").replace(/[\-.,]/g, "/");
                if ("mmddyyyy" === j) g = g.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2"); else if ("ddmmyyyy" === j) g = g.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1"); else if ("yyyymmdd" === j) g = g.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");
                f = new Date(g);
                return f instanceof Date && isFinite(f) ? f.getTime() : a;
            }
            return a;
        },
        type: "numeric"
    });
    b.addParser({
        id: "time",
        is: function(a) {
            return /^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(a);
        },
        format: function(a, b) {
            var c = a ? new Date("2000/01/01 " + a.replace(/(\S)([AP]M)$/i, "$1 $2")) : a;
            return c instanceof Date && isFinite(c) ? c.getTime() : a;
        },
        type: "numeric"
    });
    b.addParser({
        id: "metadata",
        is: function() {
            return false;
        },
        format: function(b, c, d) {
            var e = c.config, f = !e.parserMetadataName ? "sortValue" : e.parserMetadataName;
            return a(d).metadata()[f];
        },
        type: "numeric"
    });
    b.addWidget({
        id: "zebra",
        priority: 90,
        format: function(b, c, d) {
            var e, f, g, h, i, j, k, l = new RegExp(c.cssChildRow, "i"), m = c.$tbodies;
            if (c.debug) j = new Date();
            for (k = 0; k < m.length; k++) {
                h = 0;
                e = m.eq(k);
                f = e.children("tr:visible").not(c.selectorRemove);
                f.each(function() {
                    g = a(this);
                    if (!l.test(this.className)) h++;
                    i = h % 2 === 0;
                    g.removeClass(d.zebra[i ? 1 : 0]).addClass(d.zebra[i ? 0 : 1]);
                });
            }
        },
        remove: function(a, c, d) {
            var e, f, g = c.$tbodies, h = (d.zebra || [ "even", "odd" ]).join(" ");
            for (e = 0; e < g.length; e++) {
                f = b.processTbody(a, g.eq(e), true);
                f.children().removeClass(h);
                b.processTbody(a, f, false);
            }
        }
    });
    return b;
});