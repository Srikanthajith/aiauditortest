module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['select_users'] = 'SELECT * FROM users';
mysqliq['insert_into_sheets'] = 'insert into sheets (orig_name,inside_name,date_added) values (?,?,?)';
mysqliq['insert_into_expense'] = 'insert into expenses (sheet_id,date,transaction,num,name) values (?,?,?,?,?)';
mysqliq['insert_into_expensedetails'] = 'insert into expenses_details (sheet_id,expense_id,description,account,amount,type) values (?,?,?,?,?,?)';
mysqliq['update_final_expense'] = 'update expenses set total_credits = ?, total_debits = ? where id = ?';
mysqliq['update_final_sheets'] = 'update sheets set total_credits = ?, total_debits = ? where id = ?';
mysqliq['get_all_sheets'] = 'select id, orig_name, inside_name, date_added, total_credits, total_debits from sheets where 1';

mysqliq['get_all_expensesmain'] = 'select id, sheet_id, date, transaction, num, name, total_credits, total_debits from expenses where sheet_id = ?';
mysqliq['get_all_expensesinside'] = 'select id, expense_id, description, account, amount, type from expenses_details where sheet_id = ?';
