const pagination = require("pagination");

class paginationModule {
    constructor() {}

    ajaxPagination (prelink, page, limit, total){
			var paginator = new pagination.TemplatePaginator({
			prelink: prelink,
			pageLinks: 5,
			current: page,
			rowsPerPage: limit,
			totalResult: total,
			template: function(result) {
				var i, len, prelink;
				var html = '<div><ul class="pagination">';
				if(result.pageCount < 2) {
					html += '</ul></div>';
					return html;
				}
				prelink = result.prelink;
				if(result.previous) {
					html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + ')' + '">' + this.options.translator('PREVIOUS') + '</a></li>';
				}
				if(result.range.length) {
					for( i = 0, len = result.range.length; i < len; i++) {
						if(result.range[i] === result.current) {
							html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + ')' + '">' + result.range[i] + '</a></li>';
						} else {
							html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + ')' +'">' + result.range[i] + '</a></li>';
						}
					}
				}
				if(result.next) {
					html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + ')' + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
				}
				html += '</ul></div>';
				return html;
			}
		});
		return paginator.render();
  }
}

module.exports = paginationModule
