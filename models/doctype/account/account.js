const frappe = require('frappejs');

class account_meta extends frappe.meta.Meta {
    setup_meta() {
        Object.assign(this, require('./account.json'));
        this.list_options.fields = ['name', 'account_type'];
        this.setup_links();
    }

    setup_links() {
        this.get_field('parent_account').get_filters = function(query) {
            return {
                keywords: ["like", query],
                name: ["!=", this.form.doc.name]
            }
        }
    }

    get_row_html(data) {
        return `<a href="#edit/account/${data.name}">${data.name} (${data.account_type})</a>`;
    }
}

class account extends frappe.document.Document {
    setup() {
        this.add_handler('validate');
    }
    validate() {
        if (!this.account_type) {
            this.status = 'Asset';
        }
    }
}

module.exports = {account:account, account_meta:account_meta};