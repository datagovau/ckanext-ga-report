ckanext-ga-report
=================

**Status:** Development

**CKAN Version:** 1.7.1+


Overview
--------

For creating detailed reports of CKAN analytics, including totals per group.

Whereas ckanext-googleanalytics focusses on providing page view stats a recent period and for all time (aimed at end users), ckanext-ga-report is more interested in building regular periodic reports (more for site managers to monitor).

Contents of this extension:

 * Use the CLI tool to download Google Analytics data for each time period into this extension's database tables

 * Users can view the data as web page reports


Installation
------------

1. Activate you CKAN python environment and install this extension's software::

    $ pyenv/bin/activate
    $ pip install -e  git+https://github.com/datagovuk/ckanext-ga-report.git#egg=ckanext-ga-report

2. Ensure you development.ini (or similar) contains the info about your Google Analytics account and configuration::

      googleanalytics.id = UA-1010101-1
      googleanalytics.account = Account name (e.g. data.gov.uk, see top level item at https://www.google.com/analytics)
      googleanalytics.token.filepath = ~/pyenv/credentials.json
      ga-report.period = monthly
      ga-report.bounce_url = /

   The ga-report.bounce_url specifies a particular path to record the bounce rate for. Typically it is / (the home page).

3. Set up this extension's database tables using a paster command. (Ensure your CKAN pyenv is still activated, run the command from ``src/ckanext-ga-report``, alter the ``--config`` option to point to your site config file)::

    $ paster initdb --config=../ckan/development.ini

4. Enable the extension in your CKAN config file by adding it to ``ckan.plugins``::

    ckan.plugins = ga-report

Problem shooting
----------------

* ``(ProgrammingError) relation "ga_url" does not exist``
  This means that the ``paster initdb`` step has not been run successfully. Refer to the installation instructions for this extension.


Authorization
--------------

Before you can access the data, you need to set up the OAUTH details which you can do by following the `instructions <https://developers.google.com/analytics/resources/tutorials/hello-analytics-api>`_ the outcome of which will be a file called credentials.json which should look like credentials.json.template with the relevant fields completed. These steps are below for convenience:

1. Visit the `Google APIs Console <https://code.google.com/apis/console>`_

2. Sign-in and create a project or use an existing project.

3. In the `Service accounts pane <https://console.developers.google.com/iam-admin/serviceaccounts>`_ choose your project and create new account. During creation check "Furnish a new private key" -> JSON type. Write down "Service account ID"(looks like email) - it will be used later.

4. Save downloaded file - it will be used by `loadanalytics` command(referenced as <credentials.json>)

5. Go to `GoogleAnalytics console <https://analytics.google.com/analytics/web/#management>`_ and chose ADMIN tab.

6. Find "User management" button in corresponding column. Add service account using Service account ID(email) generated in 3rd step and grant "Read" role to it.


Now ensure you reference the correct path to your credentials.json in your CKAN config file (e.g. development.ini)::

    googleanalytics.token.filepath = ~/pyenv/credentials.json


Tutorial
--------

Download some GA data and store it in CKAN's database. (Ensure your CKAN pyenv is still activated, run the command from ``src/ckanext-ga-report``, alter the ``--config`` option to point to your site config file) and specifying the name of your auth file (token.dat by default) from the previous step::

    $ paster loadanalytics latest --config=../ckan/development.ini

The value after the token file is how much data you want to retrieve, this can be

* **all**         - data for all time (since 2010)

* **latest**      - (default) just the 'latest' data

* **YYYY-MM-DD**  - just data for all time periods going back to (and including) this date



Software Licence
================

This software is developed by Cabinet Office. It is Crown Copyright and opened up under the Open Government Licence (OGL) (which is compatible with Creative Commons Attibution License).

OGL terms: http://www.nationalarchives.gov.uk/doc/open-government-licence/
