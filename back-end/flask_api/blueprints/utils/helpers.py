import peewee as pw
from typing import List, Type

from app import ALLOWED_QTY
from models.utils.base_model import BaseModel


class Helper:
    @staticmethod
    def assert_id_list(idList: List[str], Class: Type[BaseModel], className: str):
        if type(idList) != list:
            return 'Data <%s> must be a list / array.' % (className + 's'), 400
        for idItem in idList:
            if type(idItem) != str:
                return 'Not all data in <%s> is a string' % (className + 's'), 400

        for idItem in idList:
            item = Class.get_or_none(Class.id == idItem)
            if not item:
                return '%s \'%s\' does not exists' % (className, idItem), 400

        uniqueIdList = list(set(idList))
        if len(uniqueIdList) != len(idList):
            return 'There is duplicated data <%s>' % (className + 's'), 400
        return 'Success', 200

    @staticmethod
    def assert_id_list_with_qty(arr: List, Class: Type[BaseModel], className: str):
        if type(arr) != list:
            return 'Data <%s> must be a list / array.' % (className), 400
        for i, item in enumerate(arr):
            if type(item) != dict:
                return '%s item #%d must be a dictionary / object' % (className, i), 400
            if any([key not in item for key in ['id', 'qty', 'unit']]):
                return '%s item #%d must has the required keys (\'id\', \'qty\', \'unit\')' % (className + 's', i), 400
            if not item['id']:
                return '%s item #%d has an empty id' % (className, i), 400
            if not item['qty']:
                return '%s item #%d has an empty qty' % (className, i), 400
            if not item['unit']:
                return '%s item #%d has an empty unit' % (className, i), 400
            if item['unit'] not in ALLOWED_QTY:
                return '%s item #%d: \'%s\' must be one of %s' % (className, i, item['unit'], ALLOWED_QTY), 400

        for item in arr:
            item = Class.get_or_none(Class.id == item['id'])
            if not item:
                return '%s \'%s\' does not exists' % (className, item['id']), 400

        idList = [item['id'] for item in arr]
        uniqueIdList = list(set(idList))
        if len(uniqueIdList) != len(idList):
            return 'There is duplicated data <%s>' % (className + 's'), 400
        return 'Success', 200
