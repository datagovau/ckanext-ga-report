import logging
import ckan.lib.helpers as h
import ckan.plugins as p
from ckan.plugins import implements, toolkit

from ckanext.ga_report.helpers import (most_popular_datasets,
                                       popular_datasets,
                                       single_popular_dataset,
                                       month_option_title,
                                       join_x,
                                       join_y,
                                       config_get,
                                       get_key_helper,
                                       get_plugins_js_string)

log = logging.getLogger('ckanext.ga-report')

class GAReportPlugin(p.SingletonPlugin):
    implements(p.IConfigurer, inherit=True)
    implements(p.IRoutes, inherit=True)
    implements(p.ITemplateHelpers, inherit=True)

    def update_config(self, config):
        toolkit.add_template_directory(config, 'templates')
        toolkit.add_public_directory(config, 'public')

    def get_helpers(self):
        """
        A dictionary of extra helpers that will be available to provide
        ga report info to templates.
        """
        return {
            'ga_report_installed': lambda: True,
            'popular_datasets': popular_datasets,
            'most_popular_datasets': most_popular_datasets,
            'single_popular_dataset': single_popular_dataset,
            'month_option_title': month_option_title,
            'join_x': join_x,
            'join_y': join_y,
            'config_get': config_get,
            'get_key_helper': get_key_helper,
            'get_plugins_js_string': get_plugins_js_string
        }

    def after_map(self, map):
        # GaReport
        map.connect(
            '/site-usage',
            controller='ckanext.ga_report.controller:GaReport',
            action='index'
        )
        map.connect(
            '/site-usage_{month}.csv',
            controller='ckanext.ga_report.controller:GaReport',
            action='csv'
        )
        map.connect(
            '/site-usage/downloads',
            controller='ckanext.ga_report.controller:GaReport',
            action='downloads'
        )
        map.connect(
            '/site-usage/downloads_{month}.csv',
            controller='ckanext.ga_report.controller:GaReport',
            action='csv_downloads'
        )

        # GaDatasetReport
        map.connect(
            '/site-usage/publisher',
            controller='ckanext.ga_report.controller:GaDatasetReport',
            action='publishers'
        )
        map.connect(
            '/site-usage/publishers_{month}.csv',
            controller='ckanext.ga_report.controller:GaDatasetReport',
            action='publisher_csv'
        )
        map.connect(
            '/site-usage/dataset/datasets_{id}_{month}.csv',
            controller='ckanext.ga_report.controller:GaDatasetReport',
            action='dataset_csv'
        )
        map.connect(
            '/site-usage/dataset',
            controller='ckanext.ga_report.controller:GaDatasetReport',
            action='read'
        )
        map.connect(
            '/site-usage/dataset/{id}',
            controller='ckanext.ga_report.controller:GaDatasetReport',
            action='read_publisher'
        )
        return map

