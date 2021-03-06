#!/usr/bin/env node
const urlparse = require("url-parse");
const querystring = require("querystring");

/*
 * Copyright (C) 2019 Nethesis S.r.l.
 * http://www.nethesis.it - info@nethesis.it
 *
 * This file is part of Dante project.
 *
 * Dante is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License,
 * or any later version.
 *
 * Dante is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dante.  If not, see COPYING.
 */

const Template = require("./Template");
const Mail = require("./Mail");

(async () => {
  // read args
  var args = process.argv.slice(2);

  // check args
  if (!args[0] || args[0].length == 0) {
    console.error("Beatrice 'URL' is required.");
    process.exit(1);
  }

  if (!args[1] || args[1].length == 0) {
    console.error("Sender address[es]' are required.");
    process.exit(1);
  }

  // get args
  var url = args[0];
  var addresses = args[1];
  var from = args[2];

  // parse url
  var queryStringParsed = new urlparse(url.replace("/#/?", "?")).query;
  var parsedQuery = querystring.parse(queryStringParsed);

  // create template and send mail
  const template = new Template();
  var html = await template.create(url, parsedQuery);

  const mail = new Mail();
  var status = await mail.send(
    html,
    addresses,
    url,
    parsedQuery,
    from
  );

  process.exit(0);
})();
